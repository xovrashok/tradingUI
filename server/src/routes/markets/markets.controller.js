const { getAllFutureSymbols } = require('../../models/binanceFuture.models');
const { getAllSymbols } = require('../../models/binanceSpot.models');



function httpGetAllMarkets(req, res) {
  return res.status(200).json(getAllSymbols());
}

function httpGetAllFutureMarkets(req, res) {
  return res.status(200).json(getAllFutureSymbols());
}



module.exports = {
  httpGetAllMarkets,
  httpGetAllFutureMarkets
};

