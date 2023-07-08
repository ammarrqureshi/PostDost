import express from 'express';
const influencerRoutes = express.Router();
import {
  registerInfluencer,
  allInfluencer,
  getInfluencerUsername,
} from '../Controllers/influencer.controller.js';
import { verifyToken } from '../middleware/jwt.js';

influencerRoutes.post('/', verifyToken, registerInfluencer);
influencerRoutes.get('/', allInfluencer);
influencerRoutes.get('/:username', getInfluencerUsername);

export default influencerRoutes;
