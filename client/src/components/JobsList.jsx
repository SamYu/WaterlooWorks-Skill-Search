import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Progress from '@material-ui/core/CircularProgress';

const tableCols = [
  'Job Id', 'Company', 'Title', 'Region', 'Summary', 'Required Skills', 'Work Term', 'Skills List',
];

const styles = {
  tableContainer: {
    marginTop: 10,
    maxHeight: '73vh',
  },
};

function JobsList({ classes, jobs, isFetching }) {
  const rowsPerPage = 50;
  const [page, setPage] = React.useState(0);
  const tableRef = useRef();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    tableRef.current.scrollTop = 0;
  };

  if (isFetching) {
    return (
      <div>
        <Progress />
      </div>
    );
  }
  return (
    <>
      <TableContainer ref={tableRef} className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableCols.map((col) => <TableCell variant="head">{col}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => (
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
      <TablePagination
        component="div"
        count={jobs.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        page={page}
        onChangePage={handleChangePage}
      />
    </>
  );
}

JobsList.propTypes = {
  classes: PropTypes.object.isRequired,
  jobs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default withStyles(styles)(JobsList);
