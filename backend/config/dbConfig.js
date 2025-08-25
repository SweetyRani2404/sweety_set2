import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  
  if (!mongoUri) {
    console.error('MONGODB_URI environment variable is required');
    process.exit(1);
  }
  
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

export default connectDB;
