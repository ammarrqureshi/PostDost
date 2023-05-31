import Influencer from '../models/influencer.model.js';
import User from '../models/user.model.js';
import createError from '../utils/createError.js';
import LogError from '../utils/LogError.js';

export const registerInfluencer = async (req, res, next) => {
  const { userId } = req;
  LogError('UserId', userId);
  try {
    const user = await User.findOne({ _id: userId });

    if (user.isInfluencer === false) {
      try {
        const newInfluencer = new Influencer({
          registeredBy: userId,
          ...req.body,
        });
        LogError('New Infuencer', newInfluencer);
        await newInfluencer
          .save()
          .then((result) => {
            //any authentication
            LogError('NI Result', result);
            res.status(201).send('User has been created successfully');
          })
          .catch((err) => {
            LogError('Saving Influencer', err);
            next(err);
          });
      } catch (error) {
        LogError('Registering Influencer', error);
        next(error);
      }
      try {
        await User.findOneAndUpdate({ _id: userId }, { isInfluencer: true });
      } catch (error) {
        LogError('Changing to Influencer', err);
      }
    } else {
      res.status(400).send('User is already a Influencer!');
    }
  } catch (error) {
    LogError('Checking Influencer', err);
  }
};

export const allInfluencer = async (req, res) => {
  try {
    const Influencers = await Influencer.find({});
    LogError('Influercers', Influencers);
    res.status(200).json(Influencers);
  } catch (error) {
    LogError('Finding Influencer', error);
  }
};
