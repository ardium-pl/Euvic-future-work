
import { loginHandler, logoutHandler, statusHandler } from '@handlers/login';
import { Router, Request, Response } from 'express';

const router = Router();
router.get('/login', loginHandler);
router.get('/status', statusHandler);
router.get('/login-failed', (req: Request, res: Response) => {
  res.status(401).send('Authentication failed. You are not authorized to access this application.');
});
router.get('/logout', logoutHandler);

export const authRouter = router;
