import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectionDB } from './configs/mongodb';
import { router } from './routers/routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', router)



const port = process.env.PORT || 2828;

connectionDB()
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})