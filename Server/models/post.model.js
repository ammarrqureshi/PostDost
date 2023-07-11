import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({});

const postSchema = new Schema({
  createdByUser: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdForInfluencer: {
    type: mongoose.Types.ObjectId,
    ref: 'Influencer',
    required: true,
  },
  createdByUserName: {
    type: String,
    required: true,
  },
  createdByUserCategory: {
    type: String,
    required: false,
    default: null,
  },
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
