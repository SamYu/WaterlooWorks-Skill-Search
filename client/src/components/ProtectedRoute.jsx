import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, ...props }) => {
  if (isAuthenticated) {
    return (
      <Route {...props} />
    );
  }
  return <Redirect to="/login" />;
};

export default ProtectedRoute;
