const express = require('express');

const { httpCreateNewOrder } = require('./orders.controller');

const orderRouter = express.Router();

orderRouter.post('/', httpCreateNewOrder);

module.exports = orderRouter;
