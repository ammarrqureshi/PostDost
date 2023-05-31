import express from 'express';
const influencerRoutes = express.Router();
import {
  registerInfluencer,
  allInfluencer,
} from '../controllers/influencer.controller.js';
import { verifyToken } from '../middleware/jwt.js';

influencerRoutes.post('/', verifyToken, registerInfluencer);
influencerRoutes.get('/', verifyToken, allInfluencer);

export default influencerRoutes;
