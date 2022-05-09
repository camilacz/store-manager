const productsService = require('../services/productsService');
const { OK, CREATED } = require('../utils/statusCode');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  return res.status(OK).json(products);
};

const findProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findProduct(id);

  return res.status(OK).json(product);
};

const registerProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.registerProduct(name, quantity);

  return res.status(CREATED).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await productsService.updateProduct(id, name, quantity);

  return res.status(OK).json(updatedProduct);
};

module.exports = {
  getAll,
  findProduct,
  registerProduct,
  updateProduct,
};
