import React from 'react';
import './TestButton.css';

function TestButton({ onClick, isDisabled }) {
  return (
    <button 
      className={`test-button ${isDisabled ? 'disabled' : ''}`} 
      onClick={onClick}
      disabled={isDisabled}
    >
      <img src="/assets/images/ui/test.svg" alt="Test" />
    </button>
  );
}

export default TestButton;