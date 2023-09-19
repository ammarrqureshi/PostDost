import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';
import LogError from '../utils/LogError.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  LogError('token', token);
  if (!token || token == 'undefiend') {
    res.json({ message: 'You are not authorized' });
    return;o
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    LogError('VerfiyingToken', err);
    if (err) {
      LogError('[VERIFIYINGTOKENERROR]', err);
      return res.json({ message: 'Token is not invalid!' });
    }
    req.userId = payload.id;
    req.isInfluencer = payload.isInfluencer;
    next();
  });
};
