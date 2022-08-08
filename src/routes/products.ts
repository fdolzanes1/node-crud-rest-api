import express from 'express';
const router = express.Router();
const path = '/products'

router.get(path, (req, res, next) => {
  res.status(200).send({ 
    message: "Using method GET in products"
  });
});

router.get(path+'/:id_product', (req, res, next) => {
  const id = req.params.id_product;
  res.status(200).send({ 
    id: id,
    message: "Using method GET in products"
  });
});

router.post(path, (req, res, next) => {
  res.status(201).send({ 
    message: "Using method POST in products"
  });
});

router.put(path+'/:id_product', (req, res, next) => {
  const id = req.params.id_product;
  res.status(200).send({ 
    id: id,
    message: "Using method PUT in products"
  });
});

router.delete(path+'/:id_product', (req, res, next) => {
  const id = req.params.id_product;
  res.status(201).send({ 
    id: id,
    message: "Using method DELETE in products"
  });
});

export default router;