import dbClient from '../utils/dbClient.js';
import bcrypt from 'bcrypt';

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

export const allShotsByClub = async (userId, golfClubId) => {
    const golfshots = await dbClient.golfShotBasic.findMany({
        where: {
            userId,
            golfClubId,
        },
    });
    return golfshots;
};

export const allShotsByUser = async (userId) => {
    const golfshots = await dbClient.golfShotBasic.findMany({
        where: {
            userId,
        },
    });
    return golfshots;
};
