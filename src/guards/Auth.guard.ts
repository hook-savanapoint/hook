import { NextFunction, Request, Response } from "express";
import { adminAuth } from "../configs/firebase/firebase";


export const AuthGuard = async(req: Request, res: Response, next: NextFunction) => {
    const { access_token } : any = req.headers;

    try {
       const { uid } = await adminAuth.verifyIdToken(access_token);
       req.creator = {
        uid
       }

       return next()
    } catch (error) {
       return res.status(401).json({error_msg: 'you are not authorzid'}) 
    }
}