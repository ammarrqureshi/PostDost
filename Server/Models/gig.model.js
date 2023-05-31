import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema ({
    
})


const postSchema = new Schema({
  img: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: Text,
    required: true,
  },
});

export default mongoose.model('Post', postSchema);
