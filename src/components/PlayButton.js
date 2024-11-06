import React from 'react';
import './PlayButton.css';

const PlayButton = ({ onClick, currentBarIndex, isAnimated }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className={`play-button ${isAnimated ? 'animated' : ''}`} onClick={handleClick}>
      <img src="/assets/images/ui/play.svg" alt={`Play Bar ${currentBarIndex + 1}`} />
    </button>
  );
};

export default PlayButton;