import Influencer from '../models/influencer.model.js';
import User from '../models/user.model.js';
import createError from '../utils/createError.js';
import LogError from '../utils/LogError.js';

export const registerInfluencer = async (req, res, next) => {
  const { userId } = req;
  LogError('UserId', userId);
  try {
    const user = await User.findOne({ _id: userId });
    const { firstName, secondName } = user;

    if (user.isInfluencer === false) {
      try {
        const newInfluencer = new Influencer({
          registeredBy: userId,
          ...req.body,
          firstName,
          secondName,
        });
        LogError('New Infuencer', newInfluencer);
        await newInfluencer
          .save()
          .then((result) => {
            //any authentication
            LogError('NI Result', result);
            res.status(201).json({
              message: 'You are registered as Influencer successfully!',
              success: true,
            });
          })
          .catch((err) => {
            LogError('Saving Influencer', err);
            res.json({
              message: 'User has been created successfully',
              success: false,
            });
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
      res.json({ message: 'User is already a Influencer!', success: false });
    }
  } catch (error) {
    LogError('Checking Influencer', err);
  }
};

export const allInfluencer = async (req, res, next) => {
  try {
    const Influencers = await Influencer.find({});
    if (!Influencers) {
      res.json({ message: 'Influencers Not Found!', success: false });
    }
    LogError('Influencers Found', Influencers);
    res.status(200).json({ Influencers });
  } catch (error) {
    LogError('Error in Finding Influencers', error);
    res.json({
      message: 'Influencers Not Found,Server Error!',
      success: false,
    });
  }
};

export const getInfluencerUsername = async (req, res) => {
  console.log(req.params);
  const { username } = req.params;
  try {
    const influencer = await Influencer.findOne({ username });
    if (!influencer) {
      LogError('No Influencer Username Fond', influencer);
      res.json({
        message: 'No influencers found with his username!',
        success: true,
      });
    }
    res.json(influencer);
  } catch (error) {
    LogError('Error in Getting Influencer Username', error);
    res.json({
      message: 'Failed to get userinfo,Server issue!',
      success: true,
    });
  }
};
