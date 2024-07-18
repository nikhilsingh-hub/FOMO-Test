import { Router } from "express";
import {getRecentCrptoData} from '../Controller/cryptoController'

const router = Router();

router.get('/:cointype', getRecentCrptoData);

export default router;