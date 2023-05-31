import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import app from './app.js';
import ConnectToMongoose from './Db/index.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import influencerRoutes from './routes/influencer.route.js';
import ErrorHandler from './middleware/globalErrorHandler.js';

const MODE = process.env.NODE_ENV;
//Generic Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:
      MODE == 'dev'
        ? process.env.REQUEST_ORIGIN_DEVELOPMENT
        : process.env.REQUEST_ORIGIN_PRODUCTION,
    credentials: true, //access-control-allow-credentials:true
    // optionSuccessStatus: 200,
  })
);

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/influencer', influencerRoutes);

//Error Handling Middleware
ErrorHandler();

app.listen(process.env.PORT, () => {
  ConnectToMongoose();
  console.log(`App is listening on ${process.env.PORT}`);
});
