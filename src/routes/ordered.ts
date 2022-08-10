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
  
  pool.query('SELECT * FROM ordered WHERE id_ordered = $1', [id], (error, data) => {
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

router.post(path, (req, res, next) => {
  
  pool.query('SELECT * FROM products WHERE id_product = $1',[req.body.id_product],(error, data) => {
      
    if (error) { return res.status(500).send({ error: error }) }
    if (data.rows.length == 0) {
      return res.status(404).send({
        mensagem: 'Não foi encontrado produto com este ID'
      });
    }
    
    pool.query('INSERT INTO ordered (id_ordered, id_product, amount) VALUES ($1,$2, $3)', [req.body.id_ordered, req.body.id_product, req.body.amount],(error, data) => {
      
      if (error) { return res.status(500).send({ error: error }) }
      
      const response = {
        ordered: {
          id_ordered: req.body.id_ordered,
          id_product: req.body.id_product,
          amount: req.body.amount
        }
      }
      
      return res.status(201).send(response);
    });

  });

});

router.delete(path+'/:id_ordered', (req, res, next) => {
  const id = req.params.id_ordered;

  pool.query('SELECT * FROM ordered WHERE id_ordered = $1', [id], (error, data) => {
    if (error) { return res.status(500).send({ error: error }) }
    if (data.rows.length == 0) {
      return res.status(404).send({
        mensagem: 'Não foi encontrado pedido com este ID'
      });
    }

    pool.query('DELETE FROM ordered WHERE id_ordered = $1', [id], (error, data) => {
  
      if (error) { return res.status(500).send({ error: error }) }
      
      return res.status(202).send({ mensagem: 'Pedido removido com sucesso' });
    });
  });

});

export default router;