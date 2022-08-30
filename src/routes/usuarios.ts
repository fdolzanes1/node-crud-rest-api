import express from 'express';
import pool from '../db/pg-connect';
import bcrypt from 'bcrypt';

const router = express.Router();
const path = '/users';

router.post(path+'/cadastro', (req, res, next) => {
  const {nome, email} = req.body;

  pool.query('SELECT * FROM usuarios WHERE email = $1',[email], (error, data) => {
      if (error) { return res.status(500).send({ error: error })}
      if(data.rows.length > 0) {
        res.status(409).send({ mensagem: "usuario ja cadastrado" })
      } else {
        bcrypt.hash(req.body.senha, 10, (error, hash) => {
          if (error) { return res.status(500).send({ error: error })}
          pool.query(`INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) `, [nome, email, hash], (error, data) => {
            if (error) { return res.status(500).send({ error: error })}
            return res.status(201).send({ mensagem: "Usuario Criado com Sucesso", email: req.body.email })
          })
        })
      }
    }
  )

  
})

export default router;