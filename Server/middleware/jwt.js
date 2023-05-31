import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';
import LogError from '../utils/LogError.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  LogError('token', token);
  if (!token || token == 'undefiend') {
    res.status(401).send('You are not authorized');
    return 0;
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    LogError('VerfiyingToken', err);
    if (err) return next(createError(403, 'Token is not valid!'));
    req.userId = payload.id;
    req.isInfluencer = payload.isInfluencer;
    next();
  });
};
