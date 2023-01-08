const { 
  getPosition,
  closePosition
} = require('../../models/binance.models');


async function httpGetPosition(req, res) {
  return res.status(200).json(await getPosition());
}

async function httpClosePosition(req, res) {
  const orderParams = req.body;

  if (!orderParams.symbol || !orderParams.type || !orderParams.sideClose || !orderParams.contracts || !orderParams.reduction) {
    return res.status(400).json({
      error: 'Missing required order property',
    });
  }

  return res.status(201).json(await closePosition(orderParams));
}


module.exports = {
  httpGetPosition,
  httpClosePosition
};
