const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT * FROM products
  ORDER BY id;
  `;
  const [products] = await connection.execute(query);

  return products;
};

const findProduct = async (id) => {
  const query = `
  SELECT * FROM products
  WHERE id=?;
  `;
  const [product] = await connection.execute(query, [id]);

  return product;
};

const registerProduct = async (name, quantity) => {
  const query = `
  INSERT INTO products(name, quantity)
  VALUES (?, ?);
  `;
  const [newProduct] = await connection.execute(query, [name, quantity]);

  return {
    id: newProduct.insertId,
    name,
    quantity,
  };
};

const getProductByName = async (name) => {
  const query = `
  SELECT * FROM products
  WHERE name = ?;
  `;

  const [product] = await connection.execute(query, [name]);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const query = `
  UPDATE products
  SET name = ?, quantity = ?
  WHERE id = ?;
  `;

  await connection.execute(query, [name, quantity, id]);

  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const query = `
  DELETE FROM products
  WHERE id = ?;
  `;

  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  findProduct,
  registerProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
};
