import Influencer from '../models/influencer.model.js';
import User from '../models/user.model.js';
import createError from '../utils/createError.js';
import LogError from '../utils/LogError.js';
import Post from '../Models/post.model.js';
export const createPost = async (req, res, next) => {
  const newPost = new Post({
    createdByUser: req.userId,
    createdForInfluencer: req.influencerId,
    ...req.body,
  });
  try {
    const savedPost = newPost
      .save()
      .then((response) => {
        LogError('Saved Post', response);
        res.status(201).json(response);
      })
      .catch((err) => {
        LogError('Saving POST', err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};
export const getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const Post = await Post.findOne({ _id: postId });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res) => {};

export const cancelPost = async (req, res) => {};
