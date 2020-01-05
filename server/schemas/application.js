import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    status: {
        type: String,
        default: 'Applied',
        required: true,
    },
    submitted: {
        type: Date,
        required: true,
    },
    deadline: {
        type: Date
    }
});

module.exports = mongoose.model('Application', applicationSchema);
