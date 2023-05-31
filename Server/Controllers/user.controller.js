import User from '../models/user.model.js';
import createError from '../utils/createError.js';
import LogError from '../utils/LogError.js';

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, 'You can delete only your account!'));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send('deleted.');
};
export const getUser = async (req, res, next) => {
  LogError('Request', req);
  LogError('ReqUserId', req.userId);
  const user = await User.findById(req.userId);
  res.status(200).send(user);
};
