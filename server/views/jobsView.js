import Job from '../schemas/job';
import fetchLatestJobs from '../utils/scrapeJobs';

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
        lastUpdated: new Date(),
    });
    return newJob.save();
};

export const findJobs = async (query) => Job.find(query);

export const fetchJobsIfNeeded = async (email, password) => {
    const newest = await Job.findOne().sort({ lastUpdated: -1 }).exec();
    const fifteenMins = 1000 * 60 * 15;
    const fifteenMinsAgo = Date.now() - fifteenMins;
    if (newest == null || (newest.lastUpdated < fifteenMinsAgo)) {
        const newJobs = await fetchLatestJobs(email, password);
        newJobs.forEach(async (job) => {
            await Job.update({ jobId: job.job }, job, { upsert: true });
        });
    }
    return Job.find();
};
