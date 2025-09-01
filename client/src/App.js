import React, { useContext , useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home'; // Import the Home page component
import Login from './pages/Login';
import Register from './pages/Register'; // Import Register component
import GeneralDiseasePrediction from './pages/GeneralDiseasePrediction';
import ChronicDiseasePrediction from './pages/ChronicDiseasePrediction';
import KidneyChronicForm from './pages/KidneyChronicForm';
import DiabetesForm from './pages/DiabetesForm'; 
import ParkinsonForm from './pages/ParkinsonForm'; 
import DoctorNearMe from './pages/DoctorNearMe';
import FeaturesNav from './pages/FeaturesNav';
import Homepage from './pages/Homepage';
import HereMap from './pages/HereMap';

import Chatbot from './pages/Chatbot';



import { UserContext } from './context/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const [showChatbot, setShowChatbot] = useState(false); // State to control chatbot visibility
  
  const handleResults = (results) => console.log('Fetched Address:', results);

  const handleError = (type, status) => console.log('Error:', type, status);
  const toggleChatbot = () => setShowChatbot(prevState => !prevState);
  return (
    <Router>
      <div>
        {/* Show navigation bar if the user is logged in */}
        {user && <FeaturesNav />}

        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Home/>}/>
          
          {/* Login and Register Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          
          {/* Feature Routes */}
          <Route path="/features/general-disease-prediction" element={user ? <GeneralDiseasePrediction /> : <Navigate to="/homepage" />} />

          
          {/* Restrict Chronic Disease Prediction to doctors only */}
          <Route 
            path="/features/chronic-disease-prediction" 
            element={user && user.role === 'doctor' ? <ChronicDiseasePrediction /> : <Navigate to="/features/general-disease-prediction" />} 
          />
          <Route path="/features/chronic-disease-prediction/kidney" element={<KidneyChronicForm />} />
          <Route path="/features/chronic-disease-prediction/parkinson" element={<ParkinsonForm />} />
          <Route path="/features/chronic-disease-prediction/diabetes" element={<DiabetesForm />} />

          <Route path="/features/doctor-near-me" element={<DoctorNearMe />} />
          <Route path="/features/here-map" element={<HereMap onFetchAddress={handleResults} onError={handleError} />} />

          <Route path="/Homepage" element={<Homepage />} />

          
          {/* Default fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* Chatbot icon */}
        <div 
          style={chatbotIconStyles} 
          onClick={toggleChatbot} 
        >
          <span style={{ fontSize: '24px' }}>💬</span> {/* Chat icon */}
        </div>

        {/* Chatbot component */}
        {showChatbot && <Chatbot />} {/* Show chatbot when state is true */}
      </div>
      
    </Router>
  );
};
const chatbotIconStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '50px',
  height: '50px',
  backgroundColor: '#00bcd4',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
};

export default App;
