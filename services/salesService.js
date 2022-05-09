const salesModel = require('../models/salesModel');
const handleError = require('../utils/handleError');
const serialize = require('../utils/serialize');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales.map(serialize);
};

const findSale = async (id) => {
  const sale = await salesModel.findSale(id);

  if (sale.length === 0) {
    const err = handleError(404, 'Sale not found');
    throw err;
  }

  return sale
    .map(serialize)
    .map(({ date, productId, quantity }) => ({ date, productId, quantity }));
};

module.exports = {
  getAll,
  findSale,
};
