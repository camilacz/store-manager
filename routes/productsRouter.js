const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const productsMiddlewares = require('../middlewares/productsMiddlewares');

const productsRouter = express.Router();

productsRouter.get('/', rescue(productsController.getAll));
productsRouter.get('/:id', rescue(productsController.findProduct));
productsRouter.post(
  '/',
  rescue(productsMiddlewares.validateProduct),
  rescue(productsController.registerProduct),
);

module.exports = productsRouter;
