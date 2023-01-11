const ccxt = require ('ccxt');
require('dotenv').config();


const binanceFuture = new ccxt.binance({
  //'rateLimit': 1000,
  'apiKey': process.env.BINANCE_API_KEY,
  'secret': process.env.BINANCE_SECRET_KEY,
  'options': { 
    'defaultType': 'future', 
    'adjustForTimeDifference': true,
  } 
});
//binanceFuture.setSandboxMode(true);

async function loadMarkets() { 
  const markets = await binanceFuture.loadMarkets();
  let ids = binanceFuture.ids;
  console.log(`${ids.length} markets found!`);
  return markets;
}


function getAllSymbols() {
  let symbols = binanceFuture.symbols;
  const renderSymbols = symbols.map(opt => ({ label: opt, value: opt }));
  return renderSymbols; 
}


async function createNewOrder(orderParams) {
  const { symbol, type, side, amount } = orderParams;
  const ticker = await (binanceFuture.fetchTicker (symbol));
  let market = binanceFuture.markets[symbol]; 
  binanceFuture.fapiPrivate_post_leverage({"symbol": market['id'], "leverage": 7});

  if (type === 'limit') {
    if (side === 'buy') {
      const price = ticker.last * 1.015;
      const amountCoin = amount / ticker.last;
      const stopPrice = ticker.last * 0.995;
      try {
        const order = await binanceFuture.createOrder(symbol, type , side, amountCoin, price, { timeInForce: 'IOC' });
        const sl = await binanceFuture.createOrder(symbol, 'market' , 'sell', amountCoin, stopPrice, { stopPrice: stopPrice });
        return order; 
      } catch (e) {
        console.log(e.constructor.name, e.message);
        return e.message;
      }
    }
    if (side === 'sell') {
      const price = ticker.last * 0.985;
      const amountCoin = amount / ticker.last;
      const stopPrice = ticker.last * 1.005;
      try {
        const order = await binanceFuture.createOrder(symbol, type , side, amountCoin, price, { timeInForce: 'IOC' });
        const sl = await binanceFuture.createOrder(symbol, 'market' , 'buy', amountCoin, stopPrice, { stopPrice: stopPrice });
        return order; 
      } catch (e) {
        console.log(e.constructor.name, e.message);
        return e.message
      }
    }
  }

  if (type === 'market') {
    if (side === 'buy') {
      const amountCoin = amount / ticker.last;
      const stopPrice = ticker.last * 0.995;
      try {
        const order = await binanceFuture.createOrder(symbol, type, side, amountCoin);
        const sl = await binanceFuture.createOrder(symbol, 'market' , 'sell', amountCoin, stopPrice, { stopPrice: stopPrice });
        return order; 
      } catch (e) {
        console.log(e.constructor.name, e.message);
        return e.message;
      }
    }
    if (side === 'sell') {
      const amountCoin = amount / ticker.last;
      const stopPrice = ticker.last * 1.005;
      try {
        const order = await binanceFuture.createOrder(symbol, type, side, amountCoin);
        const sl = await binanceFuture.createOrder(symbol, 'market' , 'buy', amountCoin, stopPrice, { stopPrice: stopPrice });
        return order;
      } catch (e) {
        console.log(e.constructor.name, e.message);
        return e.message;
      }
    }
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
  loadMarkets,
  getAllSymbols,
  createNewOrder,
  getPosition,
  closePosition
};

