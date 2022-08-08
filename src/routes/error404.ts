import express from 'express';

const routerError = express.Router();

routerError.use((req, res, next) => {
  const error = new Error('Nao Encontrado')
  res.status(404).send({ "error": error });
  next(error);
})

export default routerError;