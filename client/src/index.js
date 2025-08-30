import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import 'bulma/css/bulma.min.css';
import { UserProvider } from './context/UserContext'; // Assuming you have UserContext for user state management
import './index.css'; // Optional: Import your CSS file




// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your App within the UserProvider
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
