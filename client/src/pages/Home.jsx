import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true); // State to toggle between login and register

  return (
    <div className="hero is-fullheight is-royal-blue">
      <div className="hero-body has-text-centered">
        <div className="container">
          <h1 className="title has-text-white is-1">Welcome to MedPathway!</h1>
       
          <div className="tabs is-centered">
      <ul>
        <li className={showLogin ? 'is-active' : ''}>
          <a className=" button" onClick={() => setShowLogin(true)}>
            Login
          </a>
        </li>
        <li className={!showLogin ? 'is-active' : ''}>
          <a className=" button" onClick={() => setShowLogin(false)}>
            Register
          </a>
        </li>
      </ul>
    </div>
          {showLogin ? <Login /> : <Register />} {/* Conditionally render Login or Register */}
        </div>
      </div>
    </div>
  );
};

export default Home;
