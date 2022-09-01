import express from 'express';
const login = require ('../middleware/login')
const router = express.Router();
import {ProductsControler} from '../controllers/products-controller'
const path = '/products';

router.get(path, ProductsControler.getProducts);
router.get(path+'/:id_product', ProductsControler.getProductsById);
router.post(path, login.obrigatorio, ProductsControler.createProduct);
router.put(path+'/:id_product', login.obrigatorio, ProductsControler.updateProduct);
router.delete(path+'/:id_product', login.obrigatorio, ProductsControler.deleteProduct);

export default router;