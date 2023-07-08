import User from '../models/user.model.js';
import LogError from './LogError.js';
import UserOTPVerification from '../models/userOTPVerification.model.js';
import bcrypt from 'bcrypt';
import sendMail from './sendMail.js';

const sendOTPVerificationEmail = async ({ _id, email }, res, next) => {
  const newEmail = email.toString();
  LogError('New Email', newEmail);
  try {
    const otp = `${Math.floor(100000 + Math.random() * 9000)}`;
    LogError('Generated OTP', otp);
    if (otp && email) {
      sendMail(
        'ehsanellahiofficial@gmail.com',
        email,
        '[POSTDOST OTP VERIFICATION]!',
        `Hello, Your OTP : ${otp}!`,
        (error) => {
          if (!error) {
          } else {
            response.json({
              message: 'Error,Please Try Again...!',
              success: false,
            });
          }
        }
      );
    } else {
      await User.deleteOne({ newEmail });
      res.json({ message: 'Failed to send OTP on email!' });
    }

    console.log(`OTP email sent to ${email}`);
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await newOTPVerification.save();
    res.json({ userId: _id, email, success: true });
  } catch (error) {
    await User.deleteOne({ email });
    LogError('FAILED OTP SENDING VERIFICATION', error);
    res.json({ message: 'Server error,Please try again!' });
  }
};

export default sendOTPVerificationEmail;
