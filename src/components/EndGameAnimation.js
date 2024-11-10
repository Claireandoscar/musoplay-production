import React, { useEffect, useState } from 'react';
import './EndGameAnimation.css';


const formatDate = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName} ${day} ${monthName} ${year}`;
};

const EndGameAnimation = ({ score, barHearts, isSurveyMode = false }) => {
  console.log('isSurveyMode:', isSurveyMode); 
  const [animationStage, setAnimationStage] = useState(0);
  const [showText, setShowText] = useState(false);
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const [typedText, setTypedText] = useState('');
  const fullText = "see you tomorrow\nnew melody daily";

  // Restore the animation effects
  useEffect(() => {
    const heartAnimationDuration = 300;
    const totalHeartAnimationTime = heartAnimationDuration * 4;

    const timer = setTimeout(() => {
      if (animationStage < 4) {
        setAnimationStage(prev => prev + 1);
      } else if (animationStage === 4) {
        setShowText(true);
      }
    }, animationStage < 4 ? heartAnimationDuration : totalHeartAnimationTime);

    const midnightTimer = setInterval(() => {
      setCurrentDate(formatDate(new Date()));
    }, 1000 * 60 * 60);

    return () => {
      clearTimeout(timer);
      clearInterval(midnightTimer);
    };
  }, [animationStage]);

  // Restore the typing effect
  useEffect(() => {
    if (showText && typedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showText, typedText]);

  // Put this right after the useEffect hooks and before handleNextStep
  const getScoringPhrase = (score) => {
    if (score === 16) return "pitch perfect";
    if (score === 15) return "musical genius";
    if (score === 14) return "melody master";
    if (score === 13) return "note ninja";
    if (score === 12) return "harmony hero";
    if (score === 11) return "tune titan";
    if (score === 10) return "melody maker";
    if (score === 9) return "note navigator";
    if (score === 8) return "pitch pioneer";
    return "getting there!";
  };

  const handleNextStep = () => {
    const surveyLinks = {
      1: 'https://www.surveymonkey.com/r/musoplayfeedback1',
      2: 'https://www.surveymonkey.com/r/musoplayfeedback2',
      3: 'https://www.surveymonkey.com/r/musoplayfeedback3',
      4: 'https://www.surveymonkey.com/r/musoplayfeedback4',
      5: 'https://www.surveymonkey.com/r/musoplayfeedback5'
    };
    const urlParams = new URLSearchParams(window.location.search);
    const gameNumber = parseInt(urlParams.get('gameNumber')) || 1;
    
    window.location.href = surveyLinks[gameNumber];
  };

  const handleShare = (platform) => {
    const shareMessage = `I just scored ${score} out of 16 on Musoplay! Can you beat my score?`;
    const shareUrl = 'https://musoplay.com';

    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`, '_blank');
        break;
      case 'instagram':
        navigator.clipboard.writeText(shareMessage + ' ' + shareUrl)
          .then(() => alert('Share text copied to clipboard! You can paste this in your Instagram post.'))
          .catch(err => console.error('Failed to copy text: ', err));
        break;
      default:
        console.log('Unknown platform');
    }
  };

  return (
    <div className="end-game-animation">
      <div className="animation-content">
        {showText && (
          <>
            <h2 className="scoring-phrase">{getScoringPhrase(score)}</h2>
            <div className="score-display">
              score: {score}/16
            </div>
          </>
        )}
        <div className="hearts-display">
          {barHearts.map((hearts, index) => (
            <div key={index} className={`bar-hearts ${animationStage > index ? 'visible' : ''}`}>
              {[...Array(4)].map((_, i) => (
                <img 
                  key={i}
                  src={`/assets/images/ui/${i < hearts ? 'heart.svg' : 'heart-empty.svg'}`}
                  alt={i < hearts ? "Full Heart" : "Empty Heart"}
                  className="heart-image"
                />
              ))}
            </div>
          ))}
        </div>
        {showText && (
  <>
    <p className="date-text">{currentDate}</p>
    <div className="social-icons">
      {isSurveyMode ? (
        <button 
          className="social-icon-button next"
          onClick={handleNextStep}
          aria-label="Next: Take Survey"
        >
          <img 
            src={process.env.PUBLIC_URL + '/assets/images/ui/next.svg'} 
            alt="Next" 
            className="next-icon"
          />
        </button>
      ) : (
        <>
                  <button 
                    className="social-icon-button whatsapp"
                    onClick={() => handleShare('whatsapp')}
                    aria-label="Share on WhatsApp"
                  >
                    {/* WhatsApp SVG */}
                  </button>
                  <button
                    className="social-icon-button facebook"
                    onClick={() => handleShare('facebook')}
                    aria-label="Share on Facebook"
                  >
                    {/* Facebook SVG */}
                  </button>
                  <button
                    className="social-icon-button instagram"
                    onClick={() => handleShare('instagram')}
                    aria-label="Share on Instagram"
                  >
                    {/* Instagram SVG */}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
      {showText && (
        <>
          <div className="typed-message">
            {typedText.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <img src={process.env.PUBLIC_URL + '/assets/images/ui/logo.svg'} alt="Musoplay" className="logo" />
        </>
      )}
    </div>
  );
};

export default EndGameAnimation;