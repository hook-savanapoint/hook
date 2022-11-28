import { Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { adminAuth, firestore } from '../configs/firebase/firebase';
import { PremiumAccount } from '../models/PremiumAccounts';

const SECRET_WORD_TOKEN: string | undefined = process.env.SECRET_WORD_TOKEN!

export const generatePremiumToken = async (req: Request, res: Response) => {
    const { uid } = req.user;

    try {
        const premium_token = jwt.sign({ uid }, SECRET_WORD_TOKEN, { expiresIn: 2 });

        const account = await PremiumAccount.findOne({uid});
       

        if(!account || account === null ) {
            await PremiumAccount.create({
                uid,
                token: premium_token,
                isActive: true
            })
    
    
            await firestore.doc(`premium-accounts/${uid}`)
                .set({
                    uid,
                    premium: true,
                    premium_token
                }, { merge: true })
    
            return res.status(201).json(premium_token)
        }

        const { _id } = account;

        if(account || account != null ) {
            await PremiumAccount.updateOne({_id},{
                uid,
                token: premium_token,
                isActive: true
            })
    
    
            await firestore.doc(`premium-accounts/${uid}`)
                .set({
                    uid,
                    premium: true,
                    premium_token
                }, { merge: true })
    
            return res.status(201).json(premium_token)
        }

        
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}


export const desativatePremiumToken = async (req: Request, res: Response) => {
    const { uid } = req.user;

    try {
        const premiumAccount = await PremiumAccount.findOne({ uid });
        if(!premiumAccount)  {
            return res.status(200).json({account: 0})
        }
        premiumAccount.isActive = false;
        await adminAuth.setCustomUserClaims(uid, {
            premium: false
        });
        await firestore.doc(`premium-accounts/${uid}`)
            .set({
                premium: false
            }, { merge: true })

        await premiumAccount.save()

        return res.status(200).json({ canceled: 'your premium account expired, please renew!' })
    } catch (error) {
      
        return res.status(400).json(error)
    }
}


