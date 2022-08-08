import express from 'express';
import routerProducts from './routes/products';
import routerOrdered from './routes/ordered';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(routerProducts);
app.use(routerOrdered);

app.get('/', (req, res) => {
  res.status(200).send({ "message": "Hello World" });
});

app.listen(PORT, ()=> {
  console.log(`Listening on port ${PORT}`);
});