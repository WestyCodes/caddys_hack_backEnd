import { sendDataResponse } from '../utils/responses.js';
import { createBasicShot } from '../domain/basicShot.js';

export const createGolfShot = async (req, res) => {
    const id = Number(req.user.id);
    const body = req.body;
    body.userId = id;

    if (
        body.left === false &&
        body.right === false &&
        body.onTarget === false
    ) {
        return sendDataResponse(res, 400, {
            error: 'Server needs to know whether shot went Left, Right, or On Target.',
        });
    }
    if (body.long === false && body.short === false && body.pinHigh === false) {
        return sendDataResponse(res, 400, {
            error: 'Server needs to know whether shot went Long, Short, or Pin High.',
        });
    }
    try {
        const newShot = await createBasicShot(body);
        return sendDataResponse(res, 201, newShot);
    } catch (error) {
        console.error(`Error when creating a new golf shot \n`, error);
        return sendDataResponse(res, 500, {
            error: 'Unable to create new golf shot',
        });
    }
};
