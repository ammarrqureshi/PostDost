import { connect } from 'mongoose';
import LogError from '../Utils/LogError.js';

const ConnectToMongoose = async (req, res) => {
  try {
    const { connection } = await connect(process.env.MONGODB_URL);
    if (connection.readyState === 1) {
      LogError('MongoDB', 'Connected Successfully.');
      return Promise.resolve(true);
    } else if (connection.readyState === 2) {
      LogError('MongoDB', 'Connecting...');
    } else {
      LogError('MongoDB', 'Disconnected');
    }
    // 1 => connected
    // 2 => connecting...
    // 3 => disconnected
  } catch (error) {
    LogError('MongoDb', error);
  }
};

export default ConnectToMongoose
