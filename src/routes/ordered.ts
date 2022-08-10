import express from 'express';
import pool from '../db/pg-connect';
const router = express.Router();
const path = '/ordered'

router.get(path, (req, res, next) => {
  pool.query('SELECT * FROM ordered', (error, data) => {
    if (error) {
      return res.status(500).send({ error: error })
    }

    const response = {
      amount: data.rows.length,
      ordereds: data.rows.map(ordered => {
        return {
          id_ordered: ordered.id_ordered,
          id_product: ordered.id_product,
          amount: ordered.amount
        }
      })
    }

    res.status(200).json(response)
  });
});

router.get(path+'/:id_ordered', (req, res, next) => {
  const id = req.params.id_ordered;
  res.status(200).send({ 
    id: id,
    message: "Using method GET in ordered"
  });
});

router.post(path, (req, res, next) => {
  res.status(201).send({ 
    message: "Using method POST in ordered"
  });
});

router.put(path+'/:id_ordered', (req, res, next) => {
  const id = req.params.id_ordered;
  res.status(200).send({ 
    id: id,
    message: "Using method PUT in ordered"
  });
});

router.delete(path+'/:id_ordered', (req, res, next) => {
  const id = req.params.id_ordered;
  res.status(201).send({ 
    id: id,
    message: "Using method DELETE in ordered"
  });
});

export default router;