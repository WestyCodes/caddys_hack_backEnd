import dbClient from '../utils/dbClient.js';
// import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
    const users = await dbClient.user.findMany();
    return users;
};
