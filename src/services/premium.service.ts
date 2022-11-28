import { NextFunction, Request, Response } from "express";
import { adminAuth } from "../configs/firebase/firebase";


export const upgradeAccount = async(req: Request, res: Response, next: NextFunction) => {
    const { uid }: any = req.user;

    try {
       
        await adminAuth.setCustomUserClaims(uid, {
            premium: true
        });
        req.user = {
            uid
        }
        return next()
    } catch(error) {
        console.log(error)
      return res.status(400).json(error)
    }
}