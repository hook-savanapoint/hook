import mongoose from 'mongoose';


const url = process.env.MONGODB_URI!

export const connectionDB = async() => {
     try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });
        console.log('DB is on')
     } catch (error) {
        console.log('DB is Down: ', error)
     }
}