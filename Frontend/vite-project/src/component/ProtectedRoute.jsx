import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - userRole:', userRole);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until isAuthenticated and userRole are set
    if (isAuthenticated !== null && userRole !== null) {
      setLoading(false); // Once context values are available, stop loading
    }
  }, [isAuthenticated, userRole]);

  if (isAuthenticated === false && userRole === null) {
    return <p>User is not Authenticated.</p> // Or a loading spinner, to wait for context to initialize
  }
  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner if needed
  }

  if (isAuthenticated === null || userRole === null) {
    return null; // Or a loading spinner, to wait for context to initialize
  }

  // If the user is not authenticated, navigate to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If a role is required and the user's role doesn't match, navigate to the home page
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  // Render children if the user is authenticated and has the required role
  return children;
};

export default ProtectedRoute;
