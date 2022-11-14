import {Schema, model } from 'mongoose';


const KeysSchema = new Schema({
    creator: {
        type: String,
        required: true
    },

    keyName: {
        type: String,
        required: true
    },
   

    key: {
        type: String,
        unique: true,
        required: true
    },

    flag: {
        type: String,
        required: true
    }
}, { timestamps: true});


export const Keys = model('keys', KeysSchema)