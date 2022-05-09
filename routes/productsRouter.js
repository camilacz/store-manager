const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', rescue(productsController.getAll));
productsRouter.get('/:id', rescue(productsController.findProduct));

module.exports = productsRouter;
