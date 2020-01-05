const express = require('express');
import { postJob, getJobs } from './controllers/jobController';
const router = express.Router();

router.get('/jobs', getJobs);
router.post('/jobs', postJob);

module.exports = router;
