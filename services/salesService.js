const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
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

const updateSale = async (id, sale) => {
  const existingSale = await salesModel.findSale(id);
  if (existingSale.length === 0) {
    throw handleError(NOT_FOUND, 'Sale not found');
  }

  const existingProduct = await productsModel.findProduct(sale[0].productId);
  if (existingProduct.length === 0) {
    throw handleError(NOT_FOUND, 'Product not found');
  }

  const updatedSale = await salesModel.updateSale(id, sale);
  return {
    saleId: Number(id), itemUpdated: [...updatedSale],
  };
};

const deleteSale = async (id) => {
  const existingSale = await salesModel.findSale(id);
  if (existingSale.length === 0) {
    throw handleError(NOT_FOUND, 'Sale not found');
  }

  await salesModel.deleteProductSale(id);
  await salesModel.deleteSale(id);
};

module.exports = {
  getAll,
  findSale,
  registerNewSale,
  updateSale,
  deleteSale,
};
