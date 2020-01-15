import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar';
import HomeView from './views/HomeView';
import JobsContainer from './containers/JobsContainer';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/">
          <JobsContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
