import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendOTPVerificationEmail from '../utils/SendOTPVerificationEmail.js';
import UserOTPVerification from '../models/userOTPVerification.model.js';
import LogError from '../utils/LogError.js';

export const register = async (req, res) => {
  const { email } = req?.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ message: 'User already exists' });
      return;
    }
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
        res.json({
          message: 'LogIn failed,Please try again later!',
          success: false,
        });
      });
    // res.status(201).send('User has been created.');
  } catch (err) {
    LogError('[SIGNUPAPIERROR]', err);
    res.json({
      message: 'Server Error,Please try again later!',
      success: false,
    });
  }
};
export const login = async (req, res, next) => {
  LogError('LogInEmail', req.body);
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    LogError(User, user);
    if (!user)
      return res.json({
        message: 'User not found,try different email!',
        success: false,
      });

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    LogError('Password', isCorrect);
    if (!isCorrect)
      return res.json({
        message: 'Wrong Password,please enter correct password!',
        success: false,
      });

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
    LogError('GenToken', token);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    res
      .cookie('accessToken', token, {
        httpOnly: true,
        expires: expirationDate,
      })
      .json({ message: 'Login successfully', success: true });
  } catch (err) {
    res.json({
      message: 'Server Error,Please try again later!',
      success: false,
    });
  }
};

export const verifyOTP = async (req, res) => {
  let { userId, otpNumber } = req.body;
  LogError('Body in Verify: ', { userId, otpNumber });
  const otp = otpNumber;
  try {
    const user = await User.findOne({ _id: userId });
    if (!userId || !otp) {
      res.json({
        message: 'Empty OTP is not allowed!',
        success: false,
      });
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.findOne({
        userId: userId,
      });
      console.log(UserOTPVerificationRecords);
      if (!UserOTPVerificationRecords) {
        if (user.isVerified) {
          res.json({
            message: 'Account already verified, please login!',
            success: false,
          });
        } else {
          res.json({
            message: 'Account not found, please SignUp!',
            success: false,
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
          res.json({
            message: 'OTP Expired, resend it!',
            success: false,
          });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          console.log('validOTP', validOTP);
          if (!validOTP) {
            res.json({
              message: 'Invalid Code Passed, Please Check your inbox!',
              success: false,
            });
          } else {
            // success
            await User.updateOne({ _id: userId }, { isVerified: true });

            await UserOTPVerification.deleteMany({ userId });
            const userDetails = await User.findOne({ _id: userId });
            res.json({
              massage: 'Your email has been verified',
              data: {
                userDetails,
                userId,
                email: UserOTPVerificationRecords.email,
              },
              success: true,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Server Error,Please try again later!',
      success: false,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.json({ message: 'Please Enter Email!', success: false });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        message: 'Invalid Email,please try again with different Email!',
        success: false,
      });
      return;
    }
    const _id = user._id;
    sendOTPVerificationEmail({ _id, email }, res);
  } catch (error) {
    LogError('ForgotPassword ', error);
    res.json({
      message: 'Server Error,Please try again later!',
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie('accessToken', { httpOnly: true })
    .status(200)
    .json({ message: 'User has been logged out.' });
};
