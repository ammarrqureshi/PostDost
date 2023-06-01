import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({});

const postSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  influencerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Influencer',
    required: true,
  },
  // influencerUserName: {
  //   type: String,
  //   required: true,
  // },
  media: {
    type: [String],
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  // paymnet: paymentSchema,
  isPaymentDone: {
    type: Boolean,
    default: false,
    required: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
    required: false,
  },
});

export default mongoose.model('Post', postSchema);
