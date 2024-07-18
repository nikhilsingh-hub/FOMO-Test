import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectToDb from './db/dbConnection';
import {getAndSaveCryptoData, deleteUnusedCoins} from './Controller/cryptoController'
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

cron.schedule('*/5 * * * * *', getAndSaveCryptoData);// save new documents every 5 seconds
cron.schedule('*/200 * * * * *', deleteUnusedCoins); // delete older documents every 200 seconds

app.use(express.json());
app.use('/api', cryptoRouter)

app.get('/', (req:Request, res: Response)=>{
    res.json("Server is running");
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
