import express from 'express';
import pool from '../db/pg-connect';
const login = require ('../middleware/login')

const router = express.Router();
const path = '/products';

router.get(path, (req, res, next) => {

  pool.query('SELECT * FROM products', (error, data) => {
    if (error) {
      throw error
    }
    res.status(200).json(data.rows)
  });

});

router.get(path+'/:id_product', (req, res, next) => {
  const id = req.params.id_product;
  
  pool.query('SELECT * FROM products WHERE id_product = $1', [id], (error, data) => {
    if (error) {
      throw error
    }
    res.status(200).json(data.rows)
  });

});

router.post(path, login.obrigatorio, (req, res, next) => {

  const { nome, preco } = req.body;

  pool.query('INSERT INTO products (nome, preco) VALUES ($1, $2) RETURNING *', [nome, preco], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Products added with ID: ${results.rows[0].id_product}`)
  })
});

router.put(path+'/:id_product', login.obrigatorio, (req, res, next) => {
  const id = req.params.id_product;
  const { nome, preco } = req.body;

  pool.query(
    'UPDATE products SET nome = $1, preco = $2 WHERE id_product = $3',
    [nome, preco, id],
    (error, data) => {
      if (error) {
        res.status(400).send(`Error: ${error}`);
        next()
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
});

router.delete(path+'/:id_product', login.obrigatorio,(req, res, next) => {
  const id = req.params.id_product;
  pool.query('DELETE FROM products WHERE id_product = $1', [id], (error, data) => {
    if (error) {
      res.status(400).send(`Error: ${error}`);
      next()
    }
    res.status(200).send(`Product deleted with ID: ${id}`)
  })
});

export default router;