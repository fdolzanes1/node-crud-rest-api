import express from 'express';
import routerProducts from './routes/products';
import routerOrdered from './routes/ordered';
import routerUser from './routes/usuarios';
import {config} from './env/config';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routerProducts);
app.use(routerOrdered);
app.use(routerUser)


app.listen(config.PORT, () => {
  console.log(`APP LISTENING ${config.NODE_ENV} ON http://${config.HOST}:${config.PORT}`);
})