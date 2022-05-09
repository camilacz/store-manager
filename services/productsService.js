const productsModel = require('../models/productsModel');
const handleError = require('../utils/handleError');
const { NOT_FOUND, CONFLICT } = require('../utils/statusCode');

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

const registerProduct = async (name, quantity) => {
  const nameAvailability = await productsModel.getProductByName(name);

  if (nameAvailability.length !== 0) {
    const err = handleError(CONFLICT, 'Product already exists');
    throw err;
  }

  const registeredProduct = await productsModel.registerProduct(name, quantity);
  return registeredProduct;
};

const updateProduct = async (id, name, quantity) => {
  const product = await productsModel.findProduct(id);

  if (product.length === 0) {
    throw handleError(NOT_FOUND, 'Product not found');
  }

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);
  return updatedProduct;
};

module.exports = {
  getAll,
  findProduct,
  registerProduct,
  updateProduct,
};
