import express from 'express';
const influencerRoutes = express.Router();
import {
  registerInfluencer,
  allInfluencer,
  getInfluencerUsername,
} from '../controllers/influencer.controller.js';
import { verifyToken } from '../middleware/jwt.js';

influencerRoutes.post('/', verifyToken, registerInfluencer);
influencerRoutes.get('/', allInfluencer);
influencerRoutes.get('/:influencerId', getInfluencerUsername);

export default influencerRoutes;
