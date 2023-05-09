import { Prisma } from '@prisma/client';
import { getAllUsers } from '../domain/user.js';
import { sendDataResponse } from '../utils/responses.js';

export const getAll = async (req, res) => {
    try {
        const users = await getAllUsers();
        if (users.length > 0) {
            return sendDataResponse(res, 200, { users });
        } else {
            return sendDataResponse(res, 404, { error: 'User not found' });
        }
    } catch (e) {
        return sendDataResponse(res, 500, { error: e.message });
    }
};
