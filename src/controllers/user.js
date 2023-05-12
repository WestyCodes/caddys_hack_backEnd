import { Prisma } from '@prisma/client';
import {
    createNewUser,
    getAllUsers,
    getUserByEmail,
    createProfile,
    updateUserById,
} from '../domain/user.js';
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

export const create = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return sendDataResponse(res, 400, { error: 'Email is required' });
    }
    if (!emailValidation(email)) {
        return sendDataResponse(res, 400, { error: 'Email format invalid' });
    }
    if (!password) {
        return sendDataResponse(res, 400, { error: 'Password is required' });
    }
    if (!passwordValidation(password)) {
        return sendDataResponse(res, 400, {
            error: 'Password must contain at least one upper case character, at least one number, at least one special character and not be less than 8 characters in length.',
        });
    }

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return sendDataResponse(res, 400, {
                error: 'Email already in use',
            });
        }
        const newUser = { email, password };
        const createdUser = await createNewUser(newUser);
        return sendDataResponse(res, 201, createdUser);
    } catch (error) {
        console.error(`Error when creating new User Profile \n`, error);
        return sendDataResponse(res, 500, {
            error: 'Unable to create new user',
        });
    }
};

export const createNewProfile = async (req, res) => {
    const profile = {
        create: {},
    };

    if (req.body.firstName) {
        profile.create.firstName = req.body.firstName;
    } else {
        return sendDataResponse(res, 400, {
            error: 'Please provide a first name',
        });
    }

    if (req.body.lastName) {
        profile.create.lastName = req.body.lastName;
    } else {
        return sendDataResponse(res, 400, {
            error: 'Please provide a last name',
        });
    }

    if (req.body.bio) {
        profile.create.bio = req.body.bio;
    }

    try {
        const updatedUser = await createProfile(Number(req.params.id), profile);
        delete updatedUser.password;
        return sendDataResponse(res, 201, updatedUser);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e.code, e.message);
            return sendDataResponse(res, 400, { error: e.message });
        } else {
            console.log(e);
            return sendDataResponse(res, 400, { error: e.message });
        }
    }
};

export const updateById = async (req, res) => {
    const data = {};

    if (req.body.email) {
        if (emailValidation(req.body.email)) {
            data.email = req.body.email;
        } else {
            return sendDataResponse(res, 400, { error: 'Invalid Email' });
        }
    }
    if (req.body.password) {
        if (passwordValidation(req.body.password)) {
            data.password = req.body.password;
        } else {
            return sendDataResponse(res, 400, {
                error: 'Password must contain at least one upper case character, at least one number, at least one special character and not be less than 8 characters in length.',
            });
        }
    }

    if (req.body.role) {
        if (req.user.role === 'ADMIN') {
            data.role = req.body.role;
        } else {
            return sendDataResponse(res, 403, {
                authorization: 'Only ADMIN are allowed to update roles',
            });
        }
    }

    if (req.body.firstName || req.body.lastName || req.body.bio) {
        data.profile = { update: {} };
    }
    if (req.body.firstName) {
        data.profile.update.firstName = req.body.firstName;
    }

    if (req.body.lastName) {
        data.profile.update.lastName = req.body.lastName;
    }

    if (req.body.bio) {
        data.profile.update.bio = req.body.bio;
    }

    try {
        const updatedUser = await updateUserById(Number(req.params.id), data);
        delete updatedUser.password;
        return sendDataResponse(res, 201, { user: updatedUser });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2016') {
                return sendDataResponse(res, 400, {
                    error: 'Please create a Profile before updating it.',
                });
            }
            if (e.code === 'P2002') {
                return sendDataResponse(res, 409, {
                    error: 'Email is already in use',
                });
            }
        }
        if (e instanceof Prisma.PrismaClientValidationError) {
            return sendDataResponse(res, 400, {
                error: 'Invalid Role. Valid roles are: PUBLIC, ADMIN',
            });
        }
        return sendDataResponse(res, 400, { error: e });
    }
};

function emailValidation(email) {
    // regex explanation:
    // matches a-z, digits, and all special characters, including full stops before the @ symbol.
    // After the @ it makes sure the domain name of the email address ends in a dot. and only includes a-z, digits or hyphens.
    // and then the final part of the email address is the top-level domain name which may only contain a-z, digits, or hyphen.
    const emailRegex =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gm;
    return emailRegex.test(email.toLowerCase());
}

function passwordValidation(password) {
    // regex explanation:
    // Checks to make sure that the password has at least one digit (0-9), - (?=.*\d)
    // Checks it has at least one special character in the provided list, with some escape characters to allow backslashes etc - (?=.*[!?@#$%^&*()+_{}<>`~\\\-/.,[\]])
    // Checks it has at east one lowercase a-z character, - (?=.*[a-z])
    // Checks it has at least one uppercase a-z character, - (?=.*[A-Z])
    // Checks that it is at least 8 characters long. - .{8,}
    const passwordRegex =
        /^(?=.*\d)(?=.*[!?@#$%^&*()+_{}<>`~\\\-/.,[\]])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}
