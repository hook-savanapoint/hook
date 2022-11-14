import bcrytp from 'bcryptjs';
import { NextFunction, Response, Request } from 'express';


export const hashKey = async(req: Request, res: Response, next: NextFunction) => {
    const {key, flag, keyName } = req.body;
    console.log('HASH: ', req.body)
    const { uid } = req.creator;

    try { const salt = await bcrytp.genSalt(10);
        const hashedKey = await bcrytp.hash(key, salt);

        req.key = {
            creator: uid,
            keyName,
            flag,
            key: hashedKey
        }

        return next()
    } catch (error) {
        console.log('HASH: ', error)
        return res.status(400).json(error)
    }
}