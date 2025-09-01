// import React, { useState } from 'react';
// import '../style/Chatbot.css'
// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [userMessage, setUserMessage] = useState('');

//   // Function to handle user input and chatbot response
//   const handleSendMessage = () => {
//     if (userMessage.trim() !== '') {
//       // Add user message to chat
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'user', text: userMessage },
//       ]);

//       // Add chatbot response to chat
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'bot', text: getBotResponse(userMessage) },
//       ]);
//     }
//     setUserMessage(''); // Reset user input
//   };

//   // Basic logic to return a chatbot response
//   const getBotResponse = (message) => {
//     const lowerMessage = message.toLowerCase();
//     if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
//       return 'Hello! How can I assist you today?';
//     }
//     if (lowerMessage.includes('predict')) {
//       return 'Sure! I can help with predictions. What kind of prediction are you looking for?';
//     }
//     return 'Sorry, I didn’t quite understand that. Can you rephrase?';
//   };

//   return (
//     <div style={chatbotStyles}>
//       <div className="chat-window">
//         <div className="messages">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="input-section">
//         <input
//           type="text"
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.target.value)}
//           placeholder="Type your message here..."
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };
// const chatbotStyles = {
//     position: 'fixed',
//     bottom: '90px', // Keep it just above the chat icon
//     right: '20px',
//     width: '350px',
//     height: '400px',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '10px',
//     border: '1px solid #ccc',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     zIndex: 1000,  // Ensure it's above other content
//     padding: '20px',
//     overflowY: 'auto',
//     transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
//     opacity: 1, // Default to fully visible
//     transform: 'translateY(0)', // Initial position (no translation)
//   };

// export default Chatbot;
import React, { useState, useEffect } from 'react';
import '../style/Chatbot.css';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust the path based on your project

// Inside your component



const Chatbot = () => {
    const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
   // You can link this with context

  useEffect(() => {
    // Initial greeting
    setMessages([
      { sender: 'bot', text: '👋 Hello! Welcome to HealthCare Assistant Bot.' },
      { sender: 'bot', text: '🧑‍⚕️ Are you a Doctor or a Patient?' },
    ]);
  }, []);

  const handleSendMessage = () => {
    if (userMessage.trim() === '') return;

    const newMessage = { sender: 'user', text: userMessage };
    setMessages((prev) => [...prev, newMessage]);
    handleBotResponse(userMessage);
    setUserMessage('');
  };

  const handleBotResponse = (msg) => {
    const lower = msg.toLowerCase();

    // If role isn't set, check for role first
    if (!userRole) {
      if (lower.includes('doctor')) {
        setUserRole('doctor');
        botReply("Great! You're logged in as a Doctor 👨‍⚕️. How can I help you today?");
        botReply('💡 You can explore: General Disease Prediction or Chronic Disease Prediction');
      } else if (lower.includes('patient')) {
        setUserRole('patient');
        botReply("Awesome! You're a Patient 🧍. Let me guide you.");
        botReply('💡 Try: General Disease Prediction or Doctor Near Me.');
      } else {
        botReply('Please tell me if you are a Doctor or a Patient.');
      }
      return;
    }

    // If not logged in
    if (!user) {
      botReply('🔐 Please login first to access the features.');
      return;
    }

    // General responses
    if (lower.includes('chronic')) {
      botReply('🧠 Chronic Disease Prediction is for Doctors only.');
      botReply('➡ Choose between Kidney, Diabetes, or Parkinson.');
      botReply('✅ Fill the required medical form and click Predict.');
    } else if (lower.includes('kidney')) {
      botReply('💧 Kidney Prediction: Navigate to Chronic Disease → Kidney.');
      botReply('📋 Fill in test values like BP, sugar, etc., then submit.');
    } else if (lower.includes('diabetes')) {
      botReply('🍬 Diabetes Prediction: Use Chronic Disease → Diabetes form.');
      botReply('📝 Enter relevant metrics and click Predict.');
    } else if (lower.includes('parkinson')) {
      botReply('🧠 Parkinson Prediction: Navigate to Chronic Disease → Parkinson.');
      botReply('📊 Provide voice-related test values and hit Predict.');
    } else if (lower.includes('general')) {
      botReply('💡 General Disease Prediction: Select your symptoms and submit.');
      botReply('🩺 You’ll get disease name and recommendations.');
    } else if (lower.includes('doctor near me')) {
      botReply('📍 Doctor Near Me: Grants location access and shows a list of nearby doctors.');
      botReply('🗺️ You can click on a map marker to view contact info.');
    } else {
      botReply("🤖 Sorry, I didn't understand. Try asking about a feature like 'Chronic Disease' or 'Doctor Near Me'.");
    }
  };

  const botReply = (text) => {
    setMessages((prev) => [...prev, { sender: 'bot', text }]);
  };

  return (
    <div style={chatbotStyles}>
      {/* Chat Icon */}
      <div className="chatbot-icon" onClick={() => setIsChatOpen(!isChatOpen)}>
        💬
      </div>

      {isChatOpen && (
        <div className="chatbot-container">
          <div className="chat-window">
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="input-section">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type here..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const chatbotStyles = {
    position: 'fixed',
    bottom: '90px', // Keep it just above the chat icon
    right: '20px',
    width: '405px',
    height: '600px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,  // Ensure it's above other content
    padding: '20px',
    overflowY: 'auto',
    transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
    opacity: 1, // Default to fully visible
    transform: 'translateY(0)', // Initial position (no translation)
    };

export default Chatbot;
