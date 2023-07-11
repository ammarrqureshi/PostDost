import express from 'express';
const postRoutes = express.Router();
import { createPost, getPost } from '../controllers/post.controller.js';
import { verifyToken } from '../middleware/jwt.js';

postRoutes.post('/', verifyToken, createPost);
postRoutes.get('/:postId', getPost);
export default postRoutes;
