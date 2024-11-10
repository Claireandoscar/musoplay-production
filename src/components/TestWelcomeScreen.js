// src/components/TestWelcomeScreen.js
import React from 'react';
import './TestWelcomeScreen.css';

const TestWelcomeScreen = ({ onStartTest }) => {
  return (
    <div className="test-welcome-screen">
      <img 
        src={process.env.PUBLIC_URL + '/assets/images/ui/logo.svg'} 
        alt="Musoplay" 
        className="welcome-logo"
      />
      <div className="welcome-content">
        <h1>Thank you for your participation!</h1>
        <h2>Let the game testing begin!</h2>
        <button 
          className="start-test-button"
          onClick={onStartTest}
        >
          <img 
            src={process.env.PUBLIC_URL + '/assets/images/ui/start.svg'} 
            alt="Start" 
            className="start-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default TestWelcomeScreen;