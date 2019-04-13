import express from 'express';
import AuthService from '../services/auth.service';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  res.json({
    result: await AuthService.isValidCredentials(req.db, req.body),
  });
});

module.exports = authRouter;
