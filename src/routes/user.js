import { Router } from 'express';
import { getAll } from '../controllers/user.js';
import {
    validateAuthentication,
    validateIdOrRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/', validateAuthentication, validateIdOrRole, getAll);

export default router;
