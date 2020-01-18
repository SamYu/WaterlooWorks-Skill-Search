import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import SyncIcon from '@material-ui/icons/Sync';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core';

const styles = {
  settingsBar: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
  },
  updateBox: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    marginRight: 20,
  },
  inputs: {
    width: '150px',
    margin: '0 20px',
  },
  addFilterBox: {
    display: 'flex',
    alignItems: 'center',
  },
  activeFiltersBox: {
    margin: '0 20px',
    display: 'flex',
    alignItems: 'center',
  },
  filterChipsWrapper: {
    maxWidth: 400,
    marginLeft: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flex: 1,
  },
  filterChip: {
    margin: 5,
    textOverflow: 'ellipsis',
    maxWidth: 150,
  },
  updateButton: {
    margin: 'auto',
  },
};

const allowedFields = {
  jobId: 'Job Id',
  company: 'Company Name',
  title: 'Job Title',
  region: 'Region',
  summary: 'Job Summary',
  skills: 'Required Skills',
  workTerm: 'Work Term',
  skillsList: 'Skill List',
};

function JobsSettings({
  classes, filters, onAddFilter, lastUpdated,
  onRemoveFilter, onClearFilters, onFetchJobsIfNeeded,
}) {
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
  return (
    <Paper className={classes.settingsBar}>
      <div className={classes.updateBox}>
        <Typography variant="body1">
          {`Last Updated: ${lastUpdated ? lastUpdated.toLocaleTimeString() : null}`}
        </Typography>
        <Fab className={classes.updateButton} size="small" onClick={onFetchJobsIfNeeded} color="primary" aria-label="add">
          <SyncIcon />
        </Fab>
      </div>
      <div className={classes.addFilterBox}>
        <TextField className={classes.inputs} select value={fieldValue} onChange={handleFieldChange} label="Field">
          {Object.keys(allowedFields).map((field) => (
            <MenuItem key={field} value={field}>{allowedFields[field]}</MenuItem>
          ))}
          <MenuItem value="jobId">Job ID</MenuItem>
        </TextField>
        <TextField className={classes.inputs} value={queryValue} onChange={handleQueryChange} label="Query" />
        <Button
          size="small"
          onClick={createFilter}
          variant="contained"
          disabled={!fieldValue || !queryValue}
        >
          Add Filter
        </Button>
      </div>
      <div className={classes.activeFiltersBox}>
        {Object.keys(filters).length > 0
          && <Button size="small" onClick={onClearFilters} variant="contained">Clear Filters</Button>}
        <div className={classes.filterChipsWrapper}>
          {Object.keys(filters).map((field) => (
            <Chip
              className={classes.filterChip}
              size="small"
              onDelete={() => onRemoveFilter(field)}
              label={`${allowedFields[field]}: ${filters[field]}`}
            />
          ))}
        </div>
      </div>
    </Paper>
  );
}

JobsSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  lastUpdated: PropTypes.instanceOf(Date),
  onAddFilter: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  onFetchJobsIfNeeded: PropTypes.func.isRequired,
}

export default withStyles(styles)(JobsSettings);
