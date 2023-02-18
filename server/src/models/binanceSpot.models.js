const ccxt = require ('ccxt');
require('dotenv').config();


const binance = new ccxt.pro.binanceusdm({
  //'rateLimit': 1000,
  'apiKey': process.env.BINANCE_API_KEY,
  'secret': process.env.BINANCE_SECRET_KEY,
  'options': { 
    'defaultType': 'spot', 
    'adjustForTimeDifference': true,
  }
});
//binance.setSandboxMode(true);

async function loadSpotMarkets() { 
  const markets = await binance.loadMarkets();
  let ids = binance.ids;
  console.log(`${ids.length} spot markets found!`);
  loadTickers();
  return markets;
}

async function loadTickers() {
  let symbols = binance.symbols;
  let endRegex = /USDT$|BUSD$/gi;
  const preSelected = symbols.filter(e => e.match(endRegex));
  let endRegex2 = /UP\/USDT$|DOWN\/USDT$|UP\/BUSD$|DOWN\/BUSD$/gi;
  const selected = preSelected.filter(e => !e.match(endRegex2));

  await Promise.all (selected.map (symbol => loop(symbol)));
}

let tickArr = [];

async function loop(symbol) {
  while (true) {
    try {
      const ticker = await binance.watchTicker(symbol);
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
      console.log (symbol);
    }
  }   
}


function getAllSymbols() {
  let symbols = binance.symbols;
  let endRegex = /USDT$|BUSD$/gi;
  const preSelected = symbols.filter(e => e.match(endRegex));
  let endRegex2 = /UP\/USDT$|DOWN\/USDT$|UP\/BUSD$|DOWN\/BUSD$/gi;
  const selected = preSelected.filter(e => !e.match(endRegex2));

  const renderSymbols = selected.map(opt => ({ label: opt, value: opt }));
  return renderSymbols; 
}


async function createSpotOrder(orderParams) {
  try{
    const { symbol, type, side, amount } = orderParams;
    let objIndex = tickArr.findIndex((e => e.symbol == symbol));

    if (type === 'limit') {
      if (side === 'buy') {
        const price = tickArr[objIndex].last * 1.01;
        const amountCoin = amount / tickArr[objIndex].last;
        try {
          const order = await binance.createOrder(symbol, type , side, amountCoin, price);
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
          const order = await binance.createOrder(symbol, type , side, amountCoin, price);
          return order; 
        } catch (e) {
          console.log(e.constructor.name, e.message);
          return e.message;
        }
      }
    }
    if (type === 'market') {
      if (side === 'buy') {
        const amountCoin = amount / tickArr[objIndex].last;
        try {
          const order = await binance.createOrder(symbol, type, side, amountCoin);
          return order; 
        } catch (e) {
          console.log(e.constructor.name, e.message);
          return e.message;
        }
      }
      if (side === 'sell') {
        const amountCoin = amount / tickArr[objIndex].last;
        try {
          const order = await binance.createOrder(symbol, type, side, amountCoin);
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


async function getOpenBags() {
  try {
    let positions = await binance.fetchBalance();
    const openBags = positions.total;
    let openPositions = [];
    for (let coin in openBags) {
      let bags = {coin: '', quantity: '', value: ''};
      if (openBags[coin] !== 0 && coin != 'USDT' && coin != 'ETF') {  
        const symb = coin + '/USDT';
        const objIndex = tickArr.findIndex((e => e.symbol == symb));
        const price = tickArr[objIndex].last || 0;
        const bagsValue = (openBags[coin] * price).toFixed(2);
        bags.coin = coin;
        bags.quantity = openBags[coin];
        bags.value = bagsValue;
        openPositions.push(bags);
      } 
    }return openPositions;  
  } catch(e) {
    console.log(e.constructor.name, e.message);
    return e.message;
  }
}


async function sellTheBag(orderParams) {
  const { symbol, type, side, contracts, reduction } = orderParams;
  let size = contracts * reduction;

  try {
    const closedPosition = await binance.createOrder(symbol, type, side, size);
    return closedPosition; 
  } catch (e) {
    console.log(e.constructor.name, e.message);
    return e.message;
  }
}



module.exports = {
  loadSpotMarkets,
  getAllSymbols,
  createSpotOrder,
  getOpenBags,
  sellTheBag
};

