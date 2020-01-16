import React from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import LoginBox from '../components/LoginBox';

const LoginView = ({ isAuthenticated, onLoginUser }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div style={{ marginTop: 60 }}>
      <Typography variant="h2">WaterlooWorks Skill Search</Typography>
      <LoginBox onLoginUser={onLoginUser} />
    </div>
  );
};

export default LoginView;