import express from 'express';
const router = express.Router();
import {OrderedControler} from '../controllers/ordered-controller'
const path = '/ordered'

router.get(path, OrderedControler.getOrdered);
router.get(path+'/:id_ordered', OrderedControler.getOrderedById);
router.post(path, OrderedControler.createOrdered);
router.delete(path+'/:id_ordered', OrderedControler.deleteOrdered);

export default router;