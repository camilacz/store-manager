const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  return res.status(200).json(products);
};

const findProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findProduct(id);

  return res.status(200).json(product);
};

module.exports = {
  getAll,
  findProduct,
};
