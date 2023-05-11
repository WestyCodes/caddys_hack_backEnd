import dbClient from '../utils/dbClient.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
    const users = await dbClient.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
        },
    });
    return users;
};

export const getUserByEmail = async (email) => {
    const foundUser = await dbClient.user.findUnique({
        where: {
            email: email,
        },
    });

    if (foundUser) {
        return foundUser;
    }

    return null;
};

export const createNewUser = async (user) => {
    const { email, password } = user;
    const passwordHash = await bcrypt.hash(password, 8);

    const createdUser = await dbClient.user.create({
        data: {
            email: email,
            password: passwordHash,
        },
    });
    return createdUser;
};
