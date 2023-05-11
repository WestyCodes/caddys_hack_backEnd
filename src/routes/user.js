import { Router } from 'express';
import { getAll, create, createGolfShot } from '../controllers/user.js';
import {
    validateAuthentication,
    validateIdOrRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/', validateAuthentication, validateIdOrRole, getAll);
router.post('/', create);
router.post(
    '/golfshot',
    validateAuthentication,
    validateIdOrRole,
    createGolfShot
);

export default router;
