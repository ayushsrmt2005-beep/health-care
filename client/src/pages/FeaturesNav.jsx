import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../context/UserContext';

const FeaturesNav = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate(); // Use useNavigate here

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/'); // Redirect to Home page after logout
  };

  return (
    <nav className="navbar is-light" > 
      <div className="navbar-brand">
      <h2 className="navbar-item">MedPathway</h2>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/features/general-disease-prediction">General Disease Prediction</Link>
          {user && user.role === 'doctor' && (
            <Link className="navbar-item" to="/features/chronic-disease-prediction">Chronic Disease Prediction</Link>
          )}
          {user && user.role === 'patient' && (
          <Link className="navbar-item" to="/features/doctor-near-me">Doctor Near Me</Link>
          )}
          </div>
        <div className="navbar-end">
          {user ? ( // Conditionally render logout option if user is logged in
            <div className="navbar-item">
              <button className="button is-danger" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="navbar-item">
              <Link className="button is-primary" to="/login">Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default FeaturesNav;
