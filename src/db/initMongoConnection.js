import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const connectionString = `mongodb+srv://artuhovaela4:Nt7UzBfqGVVa7s3W@cluster0.dqdt2.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(connectionString);

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error while setting up mongo connection', error);
    throw error;
  }
};

