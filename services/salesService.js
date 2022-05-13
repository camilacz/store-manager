const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const handleError = require('../utils/handleError');
const serialize = require('../utils/serialize');
const { NOT_FOUND, UNPROCESSABLE_ENTITY } = require('../utils/statusCode');

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
  const validQuantity = sales.map(({ productId, quantity }) => (
    productsModel.findAvaiableProduct(productId, quantity)
  ));

  const validations = await Promise.all(validQuantity);

  if (validations.some((item) => item.length === 0)) {
    throw handleError(UNPROCESSABLE_ENTITY, 'Such amount is not permitted to sell');
  }

  const saleId = await salesModel.registerSale();
  const productsSold = await salesModel.registerSaleProduct(saleId, sales);

  // Atualiza quantidade em products
  await Promise.all(sales.map(({ productId, quantity }) => (
    productsModel.decreaseQuantity(quantity, productId)
  )));

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

  // Atualiza quantidade em products:
  await Promise.all(existingSale.map(({ product_id, quantity }) => (
    productsModel.increaseQuantity(quantity, product_id)
  )));

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
