import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
  tableRow: {
    '& > td > div': {
      maxWidth: 400,
      maxHeight: 200,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  truncData: {
    '& > td > div': {
      '-webkit-line-clamp': 3,
    },
  },
};

function JobsList({ classes, jobs, isFetching }) {
  const rowsPerPage = 50;
  const [page, setPage] = React.useState(0);
  const [expandedRow, setExpandedRow] = React.useState(null);
  const tableRef = useRef();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    tableRef.current.scrollTop = 0;
  };

  const handleExpandRow = (index) => {
    if (index === expandedRow) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
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
            {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job, index) => (
              <TableRow
                selected={expandedRow === index}
                onClick={() => handleExpandRow(index)}
                className={classNames(
                  classes.tableRow,
                  { [classes.truncData]: expandedRow !== index },
                )}
              >
                <TableCell>{job.jobId}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.region}</TableCell>
                <TableCell><div>{job.summary}</div></TableCell>
                <TableCell><div>{job.skills}</div></TableCell>
                <TableCell>{job.workTerm}</TableCell>
                <TableCell>
                  <div>
                    <ul>
                      {job.skillsList.map((skill) => (
                        <li>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
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
