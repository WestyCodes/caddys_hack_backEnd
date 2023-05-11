import { Router } from 'express';
import { getAll, create } from '../controllers/user.js';
import {
    validateAuthentication,
    validateIdOrRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/', validateAuthentication, validateIdOrRole, getAll);
router.post('/', create);

export default router;
