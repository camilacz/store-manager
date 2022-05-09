const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  return res.status(200).json(sales);
};

const findSale = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findSale(id);

  return res.status(200).json(sale);
};

module.exports = {
  getAll,
  findSale,
};
