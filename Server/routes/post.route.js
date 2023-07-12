import express from 'express';
const postRoutes = express.Router();
import {
  createPost,
  getPost,
  getInfluencerPosts,
} from '../controllers/post.controller.js';
import { verifyToken } from '../middleware/jwt.js';

postRoutes.post('/:username', verifyToken, createPost);
postRoutes.get('/', verifyToken, getInfluencerPosts);
postRoutes.get('/:postId', getPost);
export default postRoutes;
