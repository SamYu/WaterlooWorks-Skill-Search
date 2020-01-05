import Job from '../schemas/job';

/*
const google = new Job({ 
    jobId: 1,
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
*/

const createJob = async ({ jobId, company, title, region, summary, skills, workTerm }) => {
    const newJob = new Job({
        jobId: jobId,
        company: company,
        title: title,
        region: region,
        summary: summary,
        skills: skills,
        workTerm: workTerm
    });
    return newJob.save();
};

const findJobs = async (query) => {
    return Job.find(query);
}

module.exports = {
    createJob,
    findJobs
};
