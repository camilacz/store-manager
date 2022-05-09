const productsModel = require('../models/productsModel');
const handleError = require('../utils/handleError');
const { NOT_FOUND } = require('../utils/statusCode');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const findProduct = async (id) => {
  const product = await productsModel.findProduct(id);

  if (product.length === 0) {
    const err = handleError(NOT_FOUND, 'Product not found');
    throw err;
  }

  return product[0];
};

module.exports = {
  getAll,
  findProduct,
};
