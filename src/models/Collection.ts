import { Schema, model } from 'mongoose';


const CollectionSchema = new Schema({
    creator: {
        type: String,
        required: true
    },

    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    }
}, {timestamps: true});

export const Collection = model('collections', CollectionSchema)