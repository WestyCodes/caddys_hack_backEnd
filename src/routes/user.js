import { Router } from 'express';
import { getAll } from '../controllers/user.js';

const router = Router();

router.get('/', getAll);

export default router;
