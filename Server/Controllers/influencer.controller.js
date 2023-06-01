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

export const allInfluencer = async (req, res, next) => {
  try {
    const Influencers = await Influencer.find({});
    if (!Influencers) {
      next(createError(404, 'Influencers Not Found!'));
    }
    LogError('Influencers Found', Influencers);
    res.status(200).send(Influencers);
  } catch (error) {
    LogError('Error in Finding Influencers', error);
    next(error);
  }
};

export const getInfluencerUsername = async (req, res) => {
  const { influencerId } = req.params;
  try {
    const influencer = await Influencer.findOne({ _id: influencerId });
    if (!influencer) {
      LogError('No Influencer Username Fond', influencer);
      next(createError(404, 'No Influencer Username Found!'));
    }
    res.status(200).json(influencer.username);
  } catch (error) {
    LogError('Error in Getting Influencer Username', error);
    next(error);
  }
};
