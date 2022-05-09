const salesModel = require('../models/salesModel');
const handleError = require('../utils/handleError');
const serialize = require('../utils/serialize');
const { NOT_FOUND } = require('../utils/statusCode');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales.map(serialize);
};

const findSale = async (id) => {
  const sale = await salesModel.findSale(id);

  if (sale.length === 0) {
    const err = handleError(NOT_FOUND, 'Sale not found');
    throw err;
  }

  return sale
    .map(serialize)
    .map(({ date, productId, quantity }) => ({ date, productId, quantity }));
};

const registerNewSale = async (sales) => {
  const saleId = await salesModel.registerSale();
  const productsSold = await salesModel.registerSaleProduct(saleId, sales);

  return {
    id: saleId,
    itemsSold: [...productsSold],
  };
};

module.exports = {
  getAll,
  findSale,
  registerNewSale,
};
