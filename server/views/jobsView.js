import Job from '../schemas/job';
import fetchLatestJobs from '../utils/scrapeJobs';
import parseSkillsList from '../utils/parseSkillsList';

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
        skillsList: await parseSkillsList(skills),
        lastUpdated: new Date(),
    });
    return newJob.save();
};

export const findJobs = async (query) => Job.find(query);

export const fetchJobsIfNeeded = async (email, password) => {
    const newest = await Job.findOne().sort({ lastUpdated: -1 }).exec();
    const fifteenMins = 1000 * 60 * 30;
    const fifteenMinsAgo = Date.now() - fifteenMins;
    // if (newest == null || (newest.lastUpdated < fifteenMinsAgo)) {
    //     const newJobs = await fetchLatestJobs(email, password);
    //     newJobs.forEach(async (job) => {
    //         await Job.update({ jobId: job.job }, job, { upsert: true });
    //     });
    // }
    return Job.find();
};
