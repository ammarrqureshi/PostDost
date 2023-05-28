import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    agreement: {
      type: Boolean,
      required: true,
    },
    // img: {
    //   type: String,
    //   required: false,
    // },
    // country: {
    //   type: String,
    // required: true,
    // },
    isInfluencer: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
