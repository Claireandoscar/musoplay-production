import React from 'react';
import './Bar1.css';

const Bar1 = ({ isActive, sequence, currentNoteIndex, isBarComplete, isGameComplete, hasFailed }) => {
  const crotchetPositions = [0, 70, 140, 210];  // Beat positions
  const quaverOffsets = {
    left: 5,
    right: 32.6
  };

  const getNotePosition = (note, index, sequence) => {
    // Calculate which beat this note belongs to
    let beatIndex = 0;

    // Loop through sequence up to current note to determine beat position
    for (let i = 0; i < index; i++) {
      if (sequence[i].isQuaverLeft || sequence[i].isQuaverRight) {
        // Only increment beat after second quaver of the pair
        if (sequence[i].isQuaverRight) beatIndex++;
      } else {
        // Regular crotchet takes up one beat
        beatIndex++;
      }
    }

    // Handle current note position
    if (note.isQuaverLeft) {
      return crotchetPositions[beatIndex] + quaverOffsets.left;
    }
    if (note.isQuaverRight) {
      return crotchetPositions[beatIndex] + quaverOffsets.right;
    }
    return crotchetPositions[beatIndex];
  };

  const getNoteImagePath = (note) => {
    if (note.isQuaverLeft || note.isQuaverRight) {
      return `/assets/images/bar-notes/quavers/n${note.fullNote}.svg`;
    }
    return `/assets/images/bar-notes/crochets/n${note.number}.svg`;
  };

  return (
    <div className={`bar bar1 ${isActive ? 'active' : ''}`}>
      <div className="line"></div>
      {hasFailed ? (
        [...Array(4)].map((_, index) => (
          <div
            key={index}
            className="note visible"
            style={{ 
              left: `${crotchetPositions[index]}px`,
              width: '60px'
            }}
          >
            <img 
              src="/assets/images/ui/heart-empty.svg"
              alt="Empty Heart"
              className="note-image"
            />
          </div>
        ))
      ) : (
        sequence && sequence.map((note, index) => (
          <div
            key={index}
            className={`note ${index < currentNoteIndex || isBarComplete || isGameComplete ? 'visible' : ''} 
                     ${note.isQuaverLeft || note.isQuaverRight ? 'quaver' : 'crotchet'}`}
            style={{ 
              left: `${getNotePosition(note, index, sequence)}px`,
              width: note.isQuaverLeft || note.isQuaverRight ? '27.6px' : '60px'
            }}
          >
            <img 
              src={getNoteImagePath(note)}
              alt={`Note ${note.fullNote || note.number}`}
              className="note-image"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Bar1;