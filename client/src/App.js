import React, { useEffect, useState } from 'react';

const apiUrl = 'http://localhost:8080/api/jobs';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
    .then(res => res.json())
    .then(result => {
      console.log(result);
      setJobs(result);
    });
  }, [])

  return (
    <div style={{height: '100%', width: '100%'}}>
      {jobs.map(job => {
        return(
          <div>
            <h2>{job.company}</h2>
            <h3>{job.title}</h3>
            <p>Country: {job.region.country}</p>
            <p>State: {job.region.state}</p>
            <p>City: {job.region.city}</p>
            <p>Summary: {job.summary}</p>
            <p>Required Skills: {job.skills}</p>
            <p>Work Term: {job.workTerm}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
