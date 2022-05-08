const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT * FROM sales AS sa
  JOIN sales_products AS sp
  ON sa.id = sp.sale_id;
  `;
  const [sales] = await connection.execute(query);

  return sales;
};

const findSale = async (id) => {
  const query = `
  SELECT * FROM sales AS sa
  JOIN sales_products AS sp
  ON sa.id = sp.sale_id
  WHERE id=?;
  `;
  const [sale] = await connection.execute(query, [id]);

  return sale;
};

module.exports = {
  getAll,
  findSale,
};
