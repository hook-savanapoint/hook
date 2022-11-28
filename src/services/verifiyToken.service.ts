import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_WORD_TOKEN: string | undefined = process.env.SECRET_WORD_TOKEN!




export const verifyToken = async(req: Request, res: Response) => {
  
    const { premium_token, uid } = req.user;
    
    try {
        
         jwt.verify(premium_token, SECRET_WORD_TOKEN);
        
        return res.status(201).json({message: true})
    } catch (error) {
        return res.json({message: false})
    }
}