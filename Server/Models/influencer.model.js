import mongoose from 'mongoose';
const { Schema } = mongoose;

const influencerSchema = new Schema(
  {
    registeredBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    secondName: { type: String, required: false },
    img: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ['Web Developer', 'Digital Marketer', 'Social Media Influencer'],
      default: 'Web Developer',
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    follower: {
      type: Number,
      required: true,
      default: 0,
    },
    pricing: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Influencer', influencerSchema);
