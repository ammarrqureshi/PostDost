import User from '../Models/user.model.js';
import createError from '../Utils/createError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendOTPVerificationEmail from '../Utils/SendOTPVerificationEmail.js';
import UserOTPVerification from '../Models/userOTPVerification.model.js';
import LogError from '../Utils/LogError.js';

export const register = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser
      .save()
      .then((result) => {
        console.log('result for otp', result);
        // handle account verification
        sendOTPVerificationEmail(result, res);
      })
      .catch((err) => {
        LogError('SAVING ACCOUNT', err);
      });
    // res.status(201).send('User has been created.');
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return next(createError(404, 'User not found!'));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    console.log(isCorrect);
    if (!isCorrect)
      return next(createError(400, 'Wrong password or username!'));

    const token = jwt.sign(
      {
        id: user._id,
        isInfluencer: user.isInfluencer,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    const { password, ...info } = user._doc;
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const verifyOTP = async (req, res) => {
  let { userId, otpNumber } = req.body;
  LogError('Body in Verify: ', { userId, otpNumber });
  const otp = otpNumber;
  try {
    const user = await User.findOne({ _id: userId });
    if (!userId || !otp) {
      res.status(400).json({
        massage: 'Empty otp details are not allowed',
      });
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.findOne({
        userId: userId,
      });
      console.log(UserOTPVerificationRecords);
      if (!UserOTPVerificationRecords) {
        if (user.isVerified) {
          res.status(400).json({
            massage: 'Account already verified, please login',
          });
        } else {
          res.status(400).json({
            massage: "Account record doesn't exist. Please sign up.",
          });
        }
      } else {
        // user otp record exists
        const { expiresAt } = UserOTPVerificationRecords;
        const hashedOTP = UserOTPVerificationRecords.otp;
        if (expiresAt < Date.now()) {
          // user otp record has expired
          await UserOTPVerification.deleteMany({ userId });
          // throw Error("Code has expired. Please request again");
          res.status(400).json({
            massage: 'Code has expired. Please request again',
          });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          console.log('validOTP', validOTP);
          if (!validOTP) {
            // supplied otp is wrong
            // throw new Error("Invalid code passed. Check your inbox");
            res.status(400).json({
              massage: 'Invalid code passed. Check your inbox',
            });
          } else {
            // success
            await User.updateOne({ _id: userId }, { isVerified: true });

            await UserOTPVerification.deleteMany({ userId });
            const userDetails = await User.findOne({ _id: userId });
            res.status(200).json({
              massage: 'Your email has been verified',
              data: {
                userDetails,
                userId,
                email: UserOTPVerificationRecords.email,
              },
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.json(400).json('Please Enter Email!');
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json(404).json('Invalid Email!Please try again with different email');
    }
    const _id = user._id;
    sendOTPVerificationEmail({ _id, email }, res);
  } catch (error) {
    LogError('ForgotPassword ', error);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('User has been logged out.');
};
