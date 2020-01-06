import { connect } from 'react-redux'
import { 
  addJobFilter, 
  removeJobFilter, 
  clearJobFilters,
  fetchJobsIfNeeded,
} from '../actions/jobActions'
import JobsView from '../views/JobsView'

const getVisibleJobs = (jobs, filters) => {
    let filteredJobs = jobs.items;
    Object.keys(filters).forEach(field => {
        filteredJobs = filteredJobs.filter(job => {
            return job[field] && filters[field]
                ? job[field].toLowerCase().includes(filters[field].toLowerCase())
                : true;
        })
    })
    return filteredJobs;
}

const mapStateToProps = state => {
  return {
    jobs: getVisibleJobs(state.jobs, state.filters),
    filters: state.filters,
    isFetching: state.jobs.isFetching,
    lastUpdated: state.jobs.lastUpdated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddFilter: (field, query) => {
      dispatch(addJobFilter(field, query));
    },
    onRemoveFilter: (field) => {
      dispatch(removeJobFilter(field));
    },
    onClearFilters: () => {
      dispatch(clearJobFilters());
    },
    onFetchJobsIfNeeded: () => {
      dispatch(fetchJobsIfNeeded());
    }
  }
}

const JobsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsView)

export default JobsContainer
