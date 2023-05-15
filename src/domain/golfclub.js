import dbClient from '../utils/dbClient.js';

export const allClubs = async () => {
    const clubs = await dbClient.golfClub.findMany();
    return clubs;
};
