import { Router } from "express";
import {getRecentTwentyData} from '../Controller/cryptoController'

const router = Router();

router.get('/:cointype', getRecentTwentyData);

export default router;