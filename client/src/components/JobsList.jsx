import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Progress from '@material-ui/core/CircularProgress'

const tableCols = [ 
  'Job Id', 'Company', 'Title', 'Country', 
  'State', 'City', 'Summary', 'Required Skills', 'Work Term'
]

const styles = {

}

function JobsList({ classes, jobs, isFetching }) {
  if (isFetching) {
      return (<div>
          <Progress/>
      </div>)
  } else {
      return (
        <div>
          <Table>
            <TableBody>
              <TableRow>
                {tableCols.map(column => <TableCell variant="head">{column}</TableCell>)}
              </TableRow>
              {jobs.map(job => {
                return (
                  <TableRow>
                    <TableCell>{job.jobId}</TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.region}</TableCell>
                    <TableCell>{job.region}</TableCell>
                    <TableCell>{job.region}</TableCell>
                    <TableCell>{job.summary}</TableCell>
                    <TableCell>{job.skills}</TableCell>
                    <TableCell>{job.workTerm}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )
    }
}

JobsList.propTypes = {
  classes: PropTypes.object.isRequired,
  jobs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default withStyles(styles)(JobsList);
