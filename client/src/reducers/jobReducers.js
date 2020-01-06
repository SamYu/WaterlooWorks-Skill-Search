import {
    ADD_JOB_FILTER,
    REMOVE_JOB_FILTER,
    CLEAR_JOB_FILTERS,
    INVALIDATE_JOBS,
    REQUEST_JOBS,
    RECEIVE_JOBS,
} from '../actions/jobActions';

export function filters(state = {}, action) {
    switch (action.type) {
        case ADD_JOB_FILTER:
            return Object.assign({}, state, {
                [action.field]: action.query
            })
        case REMOVE_JOB_FILTER:
            return Object.assign({}, state, {
                [action.field]: '',
            })
        case CLEAR_JOB_FILTERS:
            return {};
        default:
            return state;
    }
}

const initialJobsState = {
    isFetching: false,
    didInvalidate: true,
    items: []
}

export function jobs(state = initialJobsState, action) {
    switch (action.type) {
        case INVALIDATE_JOBS:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case REQUEST_JOBS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        case RECEIVE_JOBS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.jobs,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

// const jobOne = {
//     jobId: 1,
//     company: 'Google',
//     title: 'Software Engineering Intern',
//     region: {
//         country: 'US',
//         state: 'CA',
//         city: 'Mountain View'
//     },
//     summary: 'The best',
//     skills: 'Stack: Go, Flutter, Dart',
//     workTerm: 'Spring 2019'
// }

// const jobTwo = {
//     jobId: 2,
//     company: 'Facebook',
//     title: 'Software Engineering Intern',
//     region: {
//         country: 'US',
//         state: 'CA',
//         city: 'Palo Alto'
//     },
//     summary: 'The best',
//     skills: 'Stack: Go, Apple, Dogo',
//     workTerm: 'Spring 2019'
// }