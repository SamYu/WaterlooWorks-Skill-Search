import React from 'react';
import { Redirect } from 'react-router-dom';
import RegisterBox from '../components/RegisterBox';

const RegisterView = ({ isAuthenticated, onRegisterUser, errorMessage }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <RegisterBox onRegisterUser={onRegisterUser} errorMessage={errorMessage} />
    </div>
  );
};

export default RegisterView;
