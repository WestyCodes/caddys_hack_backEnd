import dbClient from '../utils/dbClient.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
    const users = await dbClient.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            basicGolfShots: true,
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

export const getUserByID = async (id) => {
    const foundUser = await dbClient.user.findUnique({
        where: {
            id: id,
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

export const createProfile = async (id, profile) => {
    const updatedUser = await dbClient.user.update({
        where: {
            id,
        },
        data: {
            profile,
        },
        include: {
            profile: true,
        },
    });
    return updatedUser;
};

export const updateUserById = async (id, data) => {
    const query = {
        where: {
            id,
        },
        data: data,
        include: {
            profile: true,
        },
    };

    if (query.data.password) {
        query.data.password = await bcrypt.hash(query.data.password, 8);
    }

    const updatedUser = await dbClient.user.update(query);

    return updatedUser;
};
