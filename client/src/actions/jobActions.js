import axios from 'axios';
// Action Types

export const ADD_JOB_FILTER = 'ADD_JOB_FILTER';
export const REMOVE_JOB_FILTER = 'REMOVE_JOB_FILTER';
export const CLEAR_JOB_FILTERS = 'CLEAR_JOB_FILTERS';
export const INVALIDATE_JOBS = 'INVALIDATE_JOBS';
export const REQUEST_JOBS = 'REQUEST_JOBS';
export const RECEIVE_JOBS = 'RECEIVE_JOBS';

// Action Creators

export function addJobFilter(field, query) {
  return { type: ADD_JOB_FILTER, field, query };
}

export function removeJobFilter(field) {
  return { type: REMOVE_JOB_FILTER, field };
}

export function clearJobFilters() {
  return { type: CLEAR_JOB_FILTERS };
}

export function invalidateJobs() {
  return { type: INVALIDATE_JOBS };
}

// TODO: Filtering to prevent requesting all jobs
export function requestJobs() {
  return { type: REQUEST_JOBS };
}

export function receiveJobs(response) {
  return {
    type: RECEIVE_JOBS,
    jobs: response,
    receivedAt: new Date(),
  };
}

function fetchJobs() {
  return (dispatch) => {
    dispatch(requestJobs());
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = axios.get(
        '/api/jobs',
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      return response
        .then((res) => {
          return res.data;
        }, (err) => {
          localStorage.removeItem('jwtToken');
          return err;
        })
        .then((json) => dispatch(receiveJobs(json)));
    }
    return null;
  };
}

function shouldFetchJobs(state) {
  const jobs = state.jobs;
  if (!jobs) {
    return true;
  } else if (jobs.isFetching) {
    return false;
  } else {
    return jobs.didInvalidate;
  }
}

export function fetchJobsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchJobs(getState())) {
      return dispatch(fetchJobs());
    } else {
      return Promise.resolve();
    }
  }
}
