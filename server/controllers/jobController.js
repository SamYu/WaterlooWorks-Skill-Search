import { createJob, findJobs } from '../views/jobsView';

const postJob = async (req, res) => {
    try {
        await createJob(req.body);
        res.sendStatus(201);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
};

const getJobs = async (req, res) => {
    const query = req.query;
    Object.keys(query).map(key => {
        query[key] = new RegExp(query[key]);
    })
    try {
        const jobs = await findJobs(query);
        res.status(200).send(jobs);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
}

module.exports = {
    postJob,
    getJobs,
};
