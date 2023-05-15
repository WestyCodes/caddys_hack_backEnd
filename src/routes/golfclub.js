import { Router } from 'express';
import { getAllClubs } from '../controllers/golfclub.js';
import {
    validateAuthentication,
    validateIdOrRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/', validateAuthentication, validateIdOrRole, getAllClubs);

export default router;
