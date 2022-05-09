const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', rescue(salesController.getAll));
salesRouter.get('/:id', rescue(salesController.findSale));

module.exports = salesRouter;