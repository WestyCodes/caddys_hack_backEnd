import { Prisma } from '@prisma/client';
import { getAllUsers } from '../domain/user.js';

export const getAll = async (req, res) => {
    const users = await getAllUsers();
    console.log(users);
    return users;
};
