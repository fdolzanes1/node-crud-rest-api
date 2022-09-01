import express from 'express';
const router = express.Router();
import {UsersControler} from '../controllers/users-controller'
const path = '/users';

router.post(path+'/cadastro', UsersControler.signin)
router.post(path+'/login', UsersControler.login)

export default router;