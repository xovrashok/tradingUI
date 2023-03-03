const ccxt = require ('ccxt');
require('dotenv').config();


const binanceFuture = new ccxt.pro.binanceusdm({
  //'rateLimit': 1000,
  'apiKey': 'd80e3007eb778f434a24513cc8ebe194bebbff6b3b8f6f032407fd074364eae4',
  'secret': '3b729b4b9ece44cf83675b1ca554912e8c28aaacba124a4b88b29af42e536e35',
  'options': { 
    'defaultType': 'future', 
    'adjustForTimeDifference': true,
  } 
});
binanceFuture.setSandboxMode(true);

async function loadFutureMarkets() { 
  const markets = await binanceFuture.loadMarkets();
  let ids = binanceFuture.ids;
  console.log(`${ids.length} future markets found!`);
  loadTickers();
  return markets;
}

async function loadTickers() {
  await Promise.all (binanceFuture.symbols.map (symbol => loop(symbol)));
}

let tickArr = [];

async function loop(symbol) {
  while (true) {
    try {
      const ticker = await binanceFuture.watchTicker(symbol);
      let tickers = {symbol: '', last:''};
      if (!tickArr.find(e=>e.symbol === symbol)) {
        tickers.symbol = symbol;
        tickers.last = ticker['last'];
        tickArr.push(tickers);
      } else {
        let objIndex = tickArr.findIndex((e => e.symbol == symbol));
        tickArr[objIndex].last = ticker['last'];
      }
    } catch (e) {
      console.log (symbol, e)
    }
  }   
}


function getAllFutureSymbols() {
  let symbols = binanceFuture.symbols;
  const renderSymbols = symbols.map(opt => ({ label: opt, value: opt }));
  return renderSymbols; 
}


async function createNewOrder(orderParams) {
  try {
    const { symbol, type, side, amount } = orderParams;
    let objIndex = tickArr.findIndex((e => e.symbol == symbol));
    let market = binanceFuture.markets[symbol]; 
    binanceFuture.fapiPrivate_post_leverage({"symbol": market['id'], "leverage": 6});

    if (type === 'limit') {
      if (side === 'buy') {
        const price = tickArr[objIndex].last * 1.01;
        const amountCoin = amount / tickArr[objIndex].last;
        try {
          const order = await binanceFuture.createOrder(symbol, type , side, amountCoin, price, { timeInForce: 'IOC' });
          if (order.status === 'closed') {
            const stopPrice = order.average * 0.992;
            const sl = await binanceFuture.createOrder(symbol, 'market' , 'sell', amountCoin, stopPrice, { stopPrice: stopPrice });
          }
          return order; 
        } catch (e) {
          console.log(e.constructor.name, e.message);
          return e.message;
        }
      }
      if (side === 'sell') {
        const price = tickArr[objIndex].last * 0.99;
        const amountCoin = amount / tickArr[objIndex].last;
        try {
          const order = await binanceFuture.createOrder(symbol, type , side, amountCoin, price, { timeInForce: 'IOC' });
          if (order.status === 'closed') {
            const stopPrice = order.average * 1.008;
            const sl = await binanceFuture.createOrder(symbol, 'market' , 'buy', amountCoin, stopPrice, { stopPrice: stopPrice });
          }
          return order; 
        } catch (e) {
          console.log(e.constructor.name, e.message);
          return e.message
        }
      }
    }

    if (type === 'market') {
      if (side === 'buy') {
        const amountCoin = amount / tickArr[objIndex].last;
        try {
          const order = await binanceFuture.createOrder(symbol, type, side, amountCoin);
          const stopPrice = order.average * 0.992;
          const sl = await binanceFuture.createOrder(symbol, 'market' , 'sell', amountCoin, stopPrice, { stopPrice: stopPrice });
          return order; 
        } catch (e) {
          console.log(e.constructor.name, e.message);
          return e.message;
        }
      }
      if (side === 'sell') {
        const amountCoin = amount / tickArr[objIndex].last;
        try {
          const order = await binanceFuture.createOrder(symbol, type, side, amountCoin);
          const stopPrice = order.average * 1.008;
          const sl = await binanceFuture.createOrder(symbol, 'market' , 'buy', amountCoin, stopPrice, { stopPrice: stopPrice });
          return order;
        } catch (e) {
          console.log(e.constructor.name, e.message);
          return e.message;
        }
      }
    }
  } catch (e) {
    console.log(e.constructor.name, e.message);
    return e.message;
  }
}


async function getPosition() {
  let positions = await binanceFuture.fetchPositions();
  let openPositions = [];
  for (let i = 0; i < positions.length; i++) {
    if (positions[i]['contracts'] !== 0) {  
      openPositions.push(positions[i]);
    } 
  }return openPositions;
}


async function closePosition(orderParams) {
  const { symbol, type, sideClose, contracts, reduction } = orderParams;
  let size = contracts * reduction;
  try {
    const closedPosition = await binanceFuture.createOrder(symbol, type, sideClose, size);
    let order = await binanceFuture.fetchOpenOrders(symbol);
    const slReduction = order[0]['remaining'] - closedPosition.amount; 
    const slPrice = order[0]['triggerPrice'];
    const slSymbol = order[0]['symbol'];
    const slSide = sideClose;
    await binanceFuture.cancelOrder(order[0]['id'], order[0]['symbol']);
    if(reduction !== 1) {
      await binanceFuture.createOrder(slSymbol, 'market' , slSide, slReduction, slPrice, { stopPrice: slPrice });
    }
    return closedPosition; 
  } catch (e) {
    console.log(e.constructor.name, e.message);
    return e.message;
  }
}


module.exports = {
  loadFutureMarkets,
  getAllFutureSymbols,
  createNewOrder,
  getPosition,
  closePosition
};

