import Influencer from '../models/influencer.model.js';
import User from '../models/user.model.js';
import createError from '../utils/createError.js';
import LogError from '../utils/LogError.js';
import Post from '../Models/post.model.js';
export const createPost = async (req, res) => {
  const { id } = req.params;
  const { postData, imageURL } = req.body;
  const { Caption, postMediaURL } = postData;

  const user = await User.findById({ _id: req.userId });
  const userName = `${user.firstName} ${user.secondName}`;

  const influencer = await Influencer.findById({ _id: id });
  console.log('GotInfluencer', influencer);

  const newPost = new Post({
    createdByUser: req.userId,
    createdForInfluencer: influencer._id,
    createdByUserName: userName,
    description: Caption,
    media: [postMediaURL],
  });
  try {
    const savedPost = newPost
      .save()
      .then((response) => {
        LogError('Saved Post', response);
        res.status(201).json({ response, success: true });
      })
      .catch((err) => {
        LogError('Saving POST', err);
        res.json({ message: 'Failed to Save your Post!', success: false });
      });
  } catch (error) {
    res.json({
      message: 'Failed to Save your Post,Server Issue!',
      success: false,
    });
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
export const getInfluencerPosts = async (req, res) => {
  const influencer = await Influencer.findOne({ registeredBy: req.userId });
  console.log(influencer);
  try {
    const Posts = await Post.find({ createdForInfluencer: influencer._id });
    console.log(Posts);
    res.json({ success: true, Posts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

export const deletePost = async (req, res) => {};

export const cancelPost = async (req, res) => {};
