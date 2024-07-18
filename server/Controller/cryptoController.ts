import { Request, Response } from 'express';
import axios from 'axios'
import Crypto  from '../Models/crypto'

export const getAndSaveCryptoData = async () => {
    const coins: string[] = ['bitcoin', 'ethereum', 'solana', 'dogecoin', 'litecoin'];

    try {
        for (const coin of coins){

            const response = await axios(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`,{
                method: 'GET',
                headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-9gkRjPfUXPT5nBe2Qdq7MMGJ'}
            });

            const fetchedData = response.data;
            const crypto = new Crypto({symbol: coin, price: `usd: ${fetchedData[coin]['usd']}`});
            const savedCrypto = await crypto.save();
        }
        
    } catch (error) {
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
    } catch (error) {
        res.status(400).json({"Error e": error})
    }
}