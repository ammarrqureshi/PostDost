import mongoose from 'mongoose';
const { Schema } = mongoose;

const OTPSchema = new Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

export default mongoose.model('OTP', OTPSchema);
