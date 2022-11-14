import { NextFunction, Request, Response } from "express";
import { firestore } from "../configs/firebase/firebase";
import { Collection } from "../models/Collection";


export const index = async (req: Request, res: Response) => {
    const { uid } = req.creator;
    try {
        const collections = await Collection.find({creator: uid}).sort({createdAt: 'desc'});

        return res.status(200).json(collections)
    } catch (error) {
        return res.status(400).json(error)
    }
}


export const collection = async (req: Request, res: Response) => { 
    const { collection } = req.params;
 
    try {
     const { docs } =  await firestore.collection(`${collection}`)
       .get();
  
  const docsCollection = docs.map(docs => docs.data())
        
        return res.status(200).json(docsCollection)
      

     
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}


export const createCollection = async(req: Request, res: Response, next: NextFunction) => {
    const { uid } = req.creator;
    const { name } = req.body;

    try {
        const collection = await Collection.create({
            creator: uid,
            name
        });
        req.key = {
            flag: 'public'
        }
        const { _id } = collection;

        req.body = {
            key: JSON.stringify(_id), 
            flag: 'public',
            keyName: name
        };
        return next()
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const deleteCollection = async(req: Request, res: Response) => {
    const { _id } = req.params;

    try {
        await Collection.deleteOne({_id});
        
        return res.status(200).json({success_msg: 'your collection has been deleted successfully'})
    } catch (error) {
        return res.status(400).json(error)
    }
}