import nodemailer from 'nodemailer';
import LogError from './LogError.js';
import UserOTPVerification from '../models/userOTPVerification.model.js';
import bcrypt from 'bcrypt';
import AWS from 'aws-sdk';

const ses = new AWS.SES({
  accessKeyId: 'AKIA3GQDWZUM4VNJ6B3E',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const sendOTPVerificationEmail = async ({ _id, email }, res, next) => {
  const newEmail = email.toString();
  LogError('New Email', newEmail);
  try {
    const otp = `${Math.floor(100000 + Math.random() * 9000)}`;
    LogError('Generated OTP', otp);
    const params = {
      Source: 'ehsanellahiofficial@gmail.com',
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: `
            PostDost
            Hello ${email},
            Enter ${otp} in the app to verify your email  address and complete verification your email:
            This code expires in 1 hour . 
            If you did not request this, please ignore this email.
            Thanks`,
          },
        },
        Subject: {
          Data: 'Verify Your Email',
        },
      },
    };
    await ses.sendEmail(params).promise();
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
    res.status(200).send({ userId: _id, email });
  } catch (error) {
    LogError('FAILED OTP SENDING VERIFICATON', error);
  }
};

export default sendOTPVerificationEmail;
