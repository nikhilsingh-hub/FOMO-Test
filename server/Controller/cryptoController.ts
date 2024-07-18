import { Request, Response } from 'express';
import axios from 'axios'
import Crypto  from '../Models/crypto'
import { timeStamp } from 'console';

const coins: string[] = ['bitcoin', 'ethereum', 'solana', 'dogecoin', 'litecoin'];
// 

export const getAndSaveCryptoData = async () => {

    try {
        for (const coin of coins){

            const response = await axios(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`,{
                method: 'GET',
                headers: {accept: 'application/json',}
            });

            const fetchedData = response.data;
            const crypto = new Crypto({symbol: coin, price: `usd: ${fetchedData[coin]['usd']}`});
            const savedCrypto = await crypto.save();
        }
        
    } catch (error: any) {
        if (error.response && error.response.status === 429) {
            console.log(`Rate limit exceeded`);
        console.log(error);
    }
}
}
export const getCoinList = (req: Request, res: Response) => {
    res.status(200).json(coins)
}

export const deleteUnusedCoins = async() => {
    try {
            const documentsToDelete = await Crypto.find({}).sort({timeStamp: -1}).skip(200).exec();
            const idsOfDocumentToDelete = documentsToDelete.map(document => document._id);
            await Crypto.deleteMany({_id : {$in : idsOfDocumentToDelete}})
            console.log("Unusefull documents deleted");
       
    } catch (error: any) {
        console.log(error);
    }
}

export const getRecentCrptoData = async (req: Request, res: Response) => {

    try {
        const {cointype} = req.params;
        const data  = await Crypto.find({symbol: cointype}).sort({timestamp: -1}).limit(20);
        
        const formattedData = data.map(entry => ({
            symbol: entry.symbol,
            price: entry.price,
            timestamp: entry.timestamp
          }));
        res.status(200).json(formattedData);
    } catch (error: any) {
        res.status(400).json({"Error e": error})
    }
}