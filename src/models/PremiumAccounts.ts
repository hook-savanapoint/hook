import { Schema, model } from "mongoose";



const PremiumAccountSchema = new Schema({
    uid: {
        type: String,
        unique: true,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



export const PremiumAccount = model('premiumaccounts', PremiumAccountSchema)