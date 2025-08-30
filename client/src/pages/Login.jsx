import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [error, setError] = useState(''); // State to handle login errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      // Assuming the backend response contains the user info
      const { user } = response.data;

      // Set user information in context
      setUser(user);


      // Redirect to the features page after login
      navigate('/features/general-disease-prediction'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response ? error.response.data.message : 'Login failed. Please try again.'); // Show error message
    }
  };

  return (
    <div className="box" style={{ width: '400px', margin: '0 auto' }}>
      <h2 className="title has-text-info">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input is-info"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input is-info"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-success is-fullwidth">Login</button> {/* Centered button */}
          </div>
        </div>
      </form>
      {error && <p className="has-text-danger">{error}</p>} {/* Display error message */}
    </div>
  );
};

export default Login;
