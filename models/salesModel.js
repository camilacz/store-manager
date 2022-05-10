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

const registerSale = async () => {
  const query = 'INSERT INTO sales(date) VALUES (NOW());';
  const [sale] = await connection.execute(query);
  return sale.insertId;
};

const registerSaleProduct = async (saleId, sales) => {
  const query = `
  INSERT INTO sales_products(sale_id, product_id, quantity)
  VALUES (?, ?, ?);
  `;

  const newSales = sales.map(
    (sale) => connection.execute(query, [saleId, sale.productId, sale.quantity]),
  );
  await Promise.all(newSales);

  return [...sales];
};

const updateSale = async (id, productSale) => {
  const query = `
  UPDATE sales_products
  SET product_id = ?, quantity = ?
  WHERE sale_id = ?;
  `;
  const [{ productId, quantity }] = productSale;
  await connection.execute(query, [productId, quantity, id]);
  return [...productSale];
};

module.exports = {
  getAll,
  findSale,
  registerSale,
  registerSaleProduct,
  updateSale,
};
