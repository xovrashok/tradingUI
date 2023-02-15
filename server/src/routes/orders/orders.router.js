const express = require('express');

const { 
  httpCreateSpotOrder,
  httpCreateNewOrder 
} = require('./orders.controller');

const orderRouter = express.Router();

orderRouter.post('/spot', httpCreateSpotOrder);
orderRouter.post('/future', httpCreateNewOrder);

module.exports = orderRouter;
