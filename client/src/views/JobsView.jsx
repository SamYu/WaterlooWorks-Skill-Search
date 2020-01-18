import React from 'react';
import PropTypes from 'prop-types';
import JobsSettings from '../components/JobsSettings';
import JobsList from '../components/JobsList';

function JobsView({ jobs, filters, onAddFilter, onRemoveFilter, 
    onClearFilters, onFetchJobsIfNeeded, isFetching, lastUpdated }) {
    return (
        <div style={{marginTop: 60}}>
            <JobsSettings
                filters={filters} 
                onAddFilter={onAddFilter}
                onRemoveFilter={onRemoveFilter}
                onClearFilters={onClearFilters}
                lastUpdated={lastUpdated}
                onFetchJobsIfNeeded={onFetchJobsIfNeeded}
            />
            <JobsList jobs={jobs} isFetching={isFetching}/>
        </div>
        
    )
};

JobsView.propTypes = {
  jobs: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.instanceOf(Date),
  onAddFilter: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  onFetchJobsIfNeeded: PropTypes.func.isRequired,
}

export default JobsView;
