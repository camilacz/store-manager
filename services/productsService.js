const productsModel = require('../models/productsModel');
const handleError = require('../utils/handleError');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const findProduct = async (id) => {
  const product = await productsModel.findProduct(id);

  if (product.length === 0) {
    const err = handleError(404, 'Product not found');
    throw err;
  }

  return product[0];
};

module.exports = {
  getAll,
  findProduct,
};
