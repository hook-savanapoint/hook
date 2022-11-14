import { Request, Response } from "express";
import { Keys } from "../models/Keys";


export const getKeys = async(req: Request, res: Response) => {
    const { flag } = req.params;
    const { uid } = req.creator;

    try {
        const keys = await Keys.find({creator: uid, flag}).sort({createdAt: 'desc'});

        return res.status(200).json(keys)
    } catch (error) {
       return res.status(400).json(error) 
    }
}

export const generatorKeys = async(req: Request, res: Response) => {
    const { key, flag, keyName } = req.key;
    console.log(req.key)
    const { uid } = req.creator;

    try {
        const keys = await Keys.create({
            creator: uid,
            keyName,
            key,
            flag
        });

        return res.status(201).json(keys);
    } catch (error) {
      return res.status(400).json(error)  
    }
}


export const updateKey = async(req: Request, res: Response) => {

    const { _id } = req.params;

    try {
        await Keys.updateOne({_id}, req.key);

        return res.status(201).json({success_msg: 'your key has been updated successfully'})
    } catch (error) {
       return res.status(400).json(error) 
    }
}


export const deleteKey = async(req: Request, res: Response) => {
    const { _id } = req.params;

    try {
        await Keys.deleteOne({_id});

        return res.status(201).json({success_msg: 'your key has been deleted successfully'})

    } catch (error) {
        return res.status(400).json(error)  
    }
}