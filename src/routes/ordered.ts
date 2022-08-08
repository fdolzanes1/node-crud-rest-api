import express from 'express';
const router = express.Router();
const path = '/ordered'

router.get(path, (req, res, next) => {
  res.status(200).send({ 
    message: "Using method GET in ordered"
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