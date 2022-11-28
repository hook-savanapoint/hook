import { Router } from 'express';
import { AuthGuard } from '../guards/Auth.guard';
import { generatePremiumToken, desativatePremiumToken} from '../services/generatePremiumToken.service';
import { upgradeAccount  } from '../services/premium.service';
import { verifyToken } from '../services/verifiyToken.service';


export const router = Router();


router.post('/upgrade-account', AuthGuard, upgradeAccount, generatePremiumToken)

router.post('/desactivate-account', AuthGuard, desativatePremiumToken)

router.post('/token-account', AuthGuard, verifyToken)