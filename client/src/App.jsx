import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginView from './views/LoginView';
import JobsContainer from './containers/JobsContainer';
import { loginUser, logoutUser } from './actions/userActions';

function App({ isAuthenticated, isFetching, onLoginUser, onLogoutUser}) {
  return (
    <Router>
      <NavBar
        isAuthenticated={isAuthenticated}
        onLogoutUser={onLogoutUser}
      />
      <Switch>
        <Route path="/login">
          <LoginView isAuthenticated={isAuthenticated} onLoginUser={onLoginUser} />
        </Route>
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/" component={JobsContainer} />
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, isFetching } = auth;
  return {
    isFetching,
    isAuthenticated,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: (email, password) => {
      dispatch(loginUser(email, password));
    },
    onLogoutUser: () => {
      dispatch(logoutUser());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
