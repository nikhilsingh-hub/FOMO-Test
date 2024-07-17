import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const dbUri = process.env.MONGODB_URI;

const connectToDb = async () => {
    try {
        await mongoose.connect(dbUri!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);

        console.log('MongoDB connected');
    } catch (error) {
        console.error('Connection error', (error as Error).message);
        process.exit(1);
    }
};

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Close the Mongoose connection when the Node.js process ends
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection disconnected due to app termination');
    process.exit(0);
});

export default connectToDb;
