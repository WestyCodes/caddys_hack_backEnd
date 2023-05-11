import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET } from '../utils/config.js';
import { sendDataResponse } from '../utils/responses.js';
import { getUserByEmail } from '../domain/user.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return sendDataResponse(res, 400, {
            email: 'Invalid email and/or password provided',
        });
    }

    try {
        const foundUser = await getUserByEmail(email);
        const areCredentialsValid = await validateCredentials(
            password,
            foundUser
        );

        if (!areCredentialsValid) {
            return sendDataResponse(res, 400, {
                email: 'Invalid email and/or password provided',
            });
        }

        const token = generateJwt(foundUser.id);

        return sendDataResponse(res, 200, { token, ...foundUser.toJSON() });
    } catch (e) {
        return sendMessageResponse(res, 500, 'Unable to process request');
    }
};

function generateJwt(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

async function validateCredentials(password, user) {
    if (!user) {
        return false;
    }

    if (!password) {
        return false;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return false;
    }

    return true;
}
