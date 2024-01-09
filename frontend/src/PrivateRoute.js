import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ redirectTo, ...props }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.user.role);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (userRole ? !userRole : userRole === null) {
    // Redirect to specified page if user role is not allowed
    return <Navigate to={redirectTo} replace />;
  }

  // Render the protected component
  return <Route {...props} />;
};

export default PrivateRoute;
