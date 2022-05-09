const salesService = require('../services/salesService');
const { OK, CREATED } = require('../utils/statusCode');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  return res.status(OK).json(sales);
};

const findSale = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findSale(id);

  return res.status(OK).json(sale);
};

const registerNewSale = async (req, res) => {
  const sales = req.body;

  const newSales = await salesService.registerNewSale(sales);

  return res.status(CREATED).json(newSales);
};

module.exports = {
  getAll,
  findSale,
  registerNewSale,
};
