const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    region: {
        type: {
            country: String,
            state: String,
            city: String,
        },
        required: true,
    },
    summary: String,
    skills: String,
    workTerm: String,
});

module.exports = mongoose.model('Job', jobSchema);
