const express = require('express');
import { postJob, getJobs, fetchJobs } from './controllers/jobController';
const router = express.Router();

router.post('/fetchJobs', fetchJobs);
router.get('/jobs', getJobs);
router.post('/jobs', postJob);

module.exports = router;
