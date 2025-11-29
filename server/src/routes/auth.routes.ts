import { Router } from 'express';
import { verifyAndSyncUser, getCurrentUser } from '../controllers/auth.controller';

const router = Router();

router.post('/verify', verifyAndSyncUser);
router.get('/me', getCurrentUser);

export default router;