import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Progress from '@material-ui/core/CircularProgress';

const tableCols = [
  'Job Id', 'Company', 'Title', 'Region', 'Summary', 'Required Skills', 'Work Term', 'Skills List',
];

const styles = {
  tableContainer: {
    marginTop: 10,
    maxHeight: 800,
  },
};

function JobsList({ classes, jobs, isFetching }) {
  if (isFetching) {
    return (
      <div>
        <Progress />
      </div>
    );
  }
  return (
    <TableContainer className={classes.tableContainer}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {tableCols.map((col) => <TableCell variant="head">{col}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow>
              <TableCell>{job.jobId}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.region}</TableCell>
              <TableCell>{job.summary}</TableCell>
              <TableCell>{job.skills}</TableCell>
              <TableCell>{job.workTerm}</TableCell>
              <TableCell>
                <ul>
                  {job.skillsList.map((skill) => (
                    <li>
                      {skill}
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

JobsList.propTypes = {
  classes: PropTypes.object.isRequired,
  jobs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default withStyles(styles)(JobsList);
