import express from 'express';
import routerProducts from './routes/products';
import routerOrdered from './routes/ordered';
import routerError from './routes/error';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routerProducts);
app.use(routerOrdered);
app.use(routerError);

app.get('/', (req, res) => {
  res.status(200).send({ "message": "Hello World" });
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.NODE_ENV}.env`)
  console.log(`APP LISTENING ON http://${process.env.HOST}:${process.env.PORT}`);
})