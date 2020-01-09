import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    jobId: {
        type: Number,
        required: true,
        index: true,
        unique: true,
    },
    company: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    summary: String,
    skills: String,
    workTerm: String,
    skillsList: [String],
    lastUpdated: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Job', jobSchema);
