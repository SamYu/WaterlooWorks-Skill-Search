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

export const createJob = async ({
    jobId, company, title, region, summary, skills, workTerm,
}) => {
    const newJob = new Job({
        jobId,
        company,
        title,
        region,
        summary,
        skills,
        workTerm,
    });
    return newJob.save();
};

export const findJobs = async (query) => Job.find(query);
