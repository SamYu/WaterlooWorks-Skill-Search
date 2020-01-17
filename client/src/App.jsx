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
import RegisterView from './views/RegisterView';
import JobsContainer from './containers/JobsContainer';
import { loginUser, logoutUser, registerUser } from './actions/userActions';

function App({ isAuthenticated, errorMessage, isFetching, onLoginUser, onLogoutUser, onRegisterUser}) {
  return (
    <Router>
      <NavBar
        isAuthenticated={isAuthenticated}
        onLogoutUser={onLogoutUser}
      />
      <Switch>
        <Route path="/login">
          <LoginView
            errorMessage={errorMessage}
            isAuthenticated={isAuthenticated}
            onLoginUser={onLoginUser}
          />
        </Route>
        <Route path="/register">
          <RegisterView
            errorMessage={errorMessage}
            isAuthenticated={isAuthenticated}
            onRegisterUser={onRegisterUser}
          />
        </Route>
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/" component={JobsContainer} />
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, isFetching, errorMessage } = auth;
  return {
    isFetching,
    isAuthenticated,
    errorMessage,
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
    onRegisterUser: (email, password) => {
      dispatch(registerUser(email, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
