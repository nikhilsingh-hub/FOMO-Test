import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
    },
    price: {
        type: String,
    },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Crypto', cryptoSchema);