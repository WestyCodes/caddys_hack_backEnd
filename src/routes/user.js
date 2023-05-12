import { Router } from 'express';
import {
    getAll,
    create,
    createNewProfile,
    updateById,
} from '../controllers/user.js';
import { createGolfShot } from '../controllers/basicShot.js';
import {
    validateAuthentication,
    validateIdOrRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/', validateAuthentication, validateIdOrRole, getAll);
router.post('/', create);
router.post(
    '/:id/golfshot',
    validateAuthentication,
    validateIdOrRole,
    createGolfShot
);
router.put('/:id', validateAuthentication, validateIdOrRole, createNewProfile);
router.patch('/:id', validateAuthentication, validateIdOrRole, updateById);

export default router;
