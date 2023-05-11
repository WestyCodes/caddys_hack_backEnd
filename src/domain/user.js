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

export const createBasicShot = async (shotData) => {
    const { userId, golfClubId, left, right, onTarget, long, short, pinHigh } =
        shotData;
    const newShot = await dbClient.golfShotBasic.create({
        data: {
            userId,
            golfClubId,
            left,
            right,
            onTarget,
            long,
            short,
            pinHigh,
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                },
            },
            golfClub: true,
        },
    });
    return newShot;
};
