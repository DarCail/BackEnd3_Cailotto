import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specie: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        default: Date.now
    },
    adopted: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model('Pet', petSchema);