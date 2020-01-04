const Job = require('../schemas/job.js');

exports.getJobs = (req, res, next) => {
    Job.find((err, docs) => {
        if (err) {
            return console.log('An error occured');
        }
        const google = new Job({ 
            company: 'Google',
            title: 'Software Engineering Intern',
            region: {
                country: 'US',
                state: 'CA',
                city: 'Mountain View'
            },
            summary: 'The best',
            skills: 'Stack: Go, Flutter, Dart',
            workTerm: 'Spring 2019'
         });
        const facebook = new Job({
            company: 'Facebook',
            title: 'Software Developer Intern',
            region: {
                country: 'US',
                state: 'CA',
                city: 'Palo Alto'
            },
            summary: 'So good',
            skills: 'Stack: React, React Native, C++',
            workTerm: 'Spring 2019'
        })
        const jobs = [facebook, google];
        res.send(jobs);
    })
};
