import { Router } from 'express';
import {
    getAll,
    create,
    createNewProfile,
    updateById,
    getById,
} from '../controllers/user.js';
import { createGolfShot, findShotByClub } from '../controllers/basicShot.js';
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
router.get('/:id', validateAuthentication, validateIdOrRole, getById);
router.get(
    '/:id/golfshot',
    validateAuthentication,
    validateIdOrRole,
    findShotByClub
);

export default router;
