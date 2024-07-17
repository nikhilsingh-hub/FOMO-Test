import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectToDb from './db/dbConnection';
import {getAndSaveCryptoData} from './Controller/cryptoController'
import cryptoRouter from './Routes/cryptoRoute'
import cron from 'node-cron';
import cors from 'cors';
import bodyParser from 'body-parser';

connectToDb();
dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.SERVER_PORT || 3000;

const corsOption = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cron.schedule('*/5 * * * * *', getAndSaveCryptoData);
app.use(express.json());
app.use('/getRecentData', cryptoRouter)

app.get('/', (req:Request, res: Response)=>{
    res.json("Server is running");
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})