const express = require('express');
import { postJob, getJobs, fetchJobs } from './controllers/jobController';
import { registerUser, loginUser, currentUser, logout } from './controllers/usersController';
import { auth } from './utils/userUtils';

const router = express.Router();

// Auth Routes
router.post('/register', auth.optional, registerUser);
router.post('/login', auth.optional, loginUser);
router.get('/current', auth.required, currentUser);
router.get('/logout', auth.optional, logout);

// Jobs Routes
router.post('/fetchJobs', fetchJobs);
router.get('/jobs', getJobs);
router.post('/jobs', postJob);

module.exports = router;
