const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.json({ message: 'success!' });
});

app.get('/funcionarios/:card', async (req, res) => {
  const funcionarios = await db.selectCustomer(req.params.card);
  res.json(funcionarios);
});

app.get('/funcionarios', async (req, res) => {
  const funcionarios = await db.selectCustomers();
  res.json(funcionarios);
});

app.post('/funcionarios', async (req, res) => {
  await db.insertCostumer(req.body);
  res.json();
});

app.patch('/funcionarios/:id', async (req, res) => {
  await db.updateCostumer(req.params.id, req.body);
  res.sendStatus(200);
});

app.delete('/funcionarios/:id', async (req, res) => {
  await db.deleteCostumer(req.params.id);
  res.sendStatus(204);
});

// app.post('/login/', async (req, res) => {
//   const anser = await db.verifyLogin(req.body);
//   res.json(anser);
// });

app.listen(3000, () => {
  console.log('test server');
});
