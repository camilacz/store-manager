const salesService = require('../services/salesService');
const { OK, CREATED, NO_CONTENT } = require('../utils/statusCode');

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

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const updatedSale = await salesService.updateSale(id, sale);

  return res.status(OK).json(updatedSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  await salesService.deleteSale(id);
  return res.status(NO_CONTENT).end();
};

module.exports = {
  getAll,
  findSale,
  registerNewSale,
  updateSale,
  deleteSale,
};
