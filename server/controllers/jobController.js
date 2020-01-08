import { createJob, findJobs, fetchJobsIfNeeded } from '../views/jobsView';

export const postJob = async (req, res) => {
    try {
        await createJob(req.body);
        res.sendStatus(201);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
};

export const getJobs = async (req, res) => {
    const { query } = req;
    Object.keys(query).forEach((key) => {
        query[key] = new RegExp(query[key]);
    });
    try {
        const jobs = await findJobs(query);
        res.status(200).send(jobs);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
};

export const fetchJobs = async (req, res) => {
    const { email, password } = req.body;
    try {
        const jobs = await fetchJobsIfNeeded(email, password);
        res.status(200).send(jobs);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
};
