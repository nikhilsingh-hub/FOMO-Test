import { Router } from "express";
import {getRecentCrptoData, getCoinList} from '../Controller/cryptoController'

const router = Router();

router.get('/getRecentData/:cointype', getRecentCrptoData);
router.get('/coinList', getCoinList);

export default router;