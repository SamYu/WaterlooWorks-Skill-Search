var express = require('express');
var jobRoutes = require('./routes/jobRoutes');

var router = express.Router();

router.route('/jobs').get(jobRoutes.getJobs);

module.exports = router;
