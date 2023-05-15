import { sendDataResponse } from '../utils/responses.js';
import { allClubs } from '../domain/golfclub.js';

export const getAllClubs = async (req, res) => {
    try {
        const clubs = await allClubs();
        if (clubs.length > 0) {
            return sendDataResponse(res, 200, { clubs });
        } else {
            return sendDataResponse(res, 404, { error: 'Clubs not found' });
        }
    } catch (e) {
        return sendDataResponse(res, 500, { error: e.message });
    }
};
