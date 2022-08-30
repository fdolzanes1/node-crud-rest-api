import express from 'express';
import pool from '../db/pg-connect';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../env/config'

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

router.post(path+'/login', (req, res, next) => {
  const { email, senha } = req.body;
  pool.query('SELECT * FROM usuarios WHERE email = $1',[email], (error, data) => {
    if (error) { return res.status(500).send({ error: error })}
    if(data.rows.length < 1) {
      res.status(401).send({ mensagem: data })
    }
    bcrypt.compare(senha, data.rows[0].senha, (error, result) => {
      if (error) { return res.status(500).send({ error: "Falha na autenticacao" })}
      if (result) {
        const token = jwt.sign({
            id_usuario: data.rows[0].id_usuario,
            email: data.rows[0].email
        },
        'segredo',
        {
            expiresIn: "1h"
        });
        return res.status(200).send({
            mensagem: 'Autenticado com sucesso',
            token: token
        });
    }
      return res.status(500).send({ error: "Falha na autenticacao" })
    })
  })
})

export default router;