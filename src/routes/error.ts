import express from 'express';

const routerError = express.Router();

routerError.use((req, res, next) => {
  res.status(404).send({ "error": "Nao Encontrado" });
  next();
});

export default routerError;