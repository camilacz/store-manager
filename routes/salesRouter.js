const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const salesMiddlewares = require('../middlewares/salesMiddlewares');

const salesRouter = express.Router();

salesRouter.get('/', rescue(salesController.getAll));
salesRouter.get('/:id', rescue(salesController.findSale));
salesRouter.post(
  '/',
  rescue(salesMiddlewares.validateSale),
  rescue(salesController.registerNewSale),
);
salesRouter.put(
  '/:id',
  rescue(salesMiddlewares.validateSale),
  rescue(salesController.updateSale),
);

module.exports = salesRouter;
