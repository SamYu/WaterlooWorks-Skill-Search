import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function JobsSettings({ filters, onAddFilter, lastUpdated, onRemoveFilter, onClearFilters,  onFetchJobsIfNeeded }) {
    const [fieldValue, setFieldValue] = useState('');
    const [queryValue, setQueryValue] = useState('');

    useEffect(() => {
        onFetchJobsIfNeeded();
    }, []);

    function handleFieldChange(event) {
        setFieldValue(event.target.value);
    }

    function handleQueryChange(event) {
        setQueryValue(event.target.value);
    }

    function createFilter() {
        onAddFilter(fieldValue, queryValue);
        setFieldValue('');
        setQueryValue('');
    }
    return  (
        <div>
            <div>
                {Object.keys(filters).map(field => {
                    return (filters[field] &&
                        <a onClick={() => onRemoveFilter(field)}>{`${field}: ${filters[field]}`}</a>
                    )
                })}
                <a onClick={() => onClearFilters()}>Clear All Filters</a>
            </div>
            <p>{`Last Updated: ${lastUpdated ? lastUpdated.toTimeString() : null}`}</p>
            <a onClick={() => onFetchJobsIfNeeded()}>Fetch Jobs</a>
            <p>Field</p>
            <input value={fieldValue} onChange={handleFieldChange}/>
            <p>Query</p>
            <input value={queryValue} onChange={handleQueryChange}/>
            <a onClick={() => createFilter()}>Add Filter</a>
        </div>
    )
}

JobsSettings.propTypes = {
    filters: PropTypes.object.isRequired,
    lastUpdated: PropTypes.number,
    onAddFilter: PropTypes.func.isRequired,
    onRemoveFilter: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
    onFetchJobsIfNeeded: PropTypes.func.isRequired,
}

export default JobsSettings;
