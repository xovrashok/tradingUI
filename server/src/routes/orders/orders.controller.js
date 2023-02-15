const { createNewOrder } = require('../../models/binanceFuture.models');
const { createSpotOrder } = require('../../models/binanceSpot.models');



async function httpCreateNewOrder(req, res) {
  const orderParams = req.body;

  if (!orderParams.symbol || !orderParams.type || !orderParams.side || !orderParams.amount) {
    return res.status(400).json({
      error: 'Missing required order property',
    });
  }

  return res.status(201).json(await createNewOrder(orderParams));
}


async function httpCreateSpotOrder(req, res) {
  const orderParams = req.body;

  if (!orderParams.symbol || !orderParams.type || !orderParams.side || !orderParams.amount) {
    return res.status(400).json({
      error: 'Missing required order property',
    });
  }

  return res.status(201).json(await createSpotOrder(orderParams));
}


module.exports = {
  httpCreateNewOrder,
  httpCreateSpotOrder
};
