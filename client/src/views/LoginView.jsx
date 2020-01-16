import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginBox from '../components/LoginBox';

const LoginView = ({ isAuthenticated, onLoginUser, errorMessage }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <LoginBox onLoginUser={onLoginUser} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginView;
