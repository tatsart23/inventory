import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate if using React Router

const Logout = () => {
  const { logout } = useContext(AuthContext); // Access the logout function from the context
  const navigate = useNavigate(); // For redirecting after logout

  useEffect(() => {
    
    logout();

    
    navigate('/login');
  }, [logout, navigate]);

  return (
    <div>
      <h1>You have successfully logged out</h1>
    </div>
  );
};

export default Logout;