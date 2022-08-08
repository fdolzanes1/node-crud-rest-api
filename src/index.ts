import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({ "message": "Hello World" });
});

app.listen(PORT, ()=> {
  console.log(`Listening on port ${PORT}`);
});