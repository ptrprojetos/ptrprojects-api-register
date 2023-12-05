async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const { Pool } = require('pg');

  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  });

  const client = await pool.connect();

  client.release();

  global.connection = pool;
  return pool.connect();
}

connect();

async function selectCustomers() {
  const client = await connect();
  const res = await client.query('SELECT * FROM funcionarios');
  return res.rows;
}

async function selectCustomer(card) {
  const client = await connect();
  const res = await client.query('SELECT * FROM funcionarios WHERE cartao=$1', [
    card,
  ]);
  return res.rows;
}

async function insertCostumer(costumer) {
  const client = await connect();
  const sql = 'INSERT INTO funcionarios(nome,cartao,setor) VALUES ($1, $2, $3)';
  const values = [costumer.nome, costumer.cartao, costumer.setor];
  await client.query(sql, values);
}

async function updateCostumer(id, costumer) {
  const client = await connect();
  const sql =
    'UPDATE funcionarios SET nome=$1, cartao=$2, setor=$3 WHERE id=$4';
  const values = [costumer.nome, costumer.cartao, costumer.setor, id];
  await client.query(sql, values);
}

async function deleteCostumer(id) {
  const client = await connect();
  const sql = 'DELETE FROM funcionarios WHERE id=$1';
  await client.query(sql, [id]);
}

module.exports = {
  selectCustomers,
  selectCustomer,
  insertCostumer,
  updateCostumer,
  deleteCostumer,
};
