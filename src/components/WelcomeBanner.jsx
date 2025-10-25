/**
 * WelcomeBanner Component
 * Hero section with cross design, countdown, and rotating blessing quotes
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CountdownMemo } from './OptimizedComponents';

const WelcomeBanner = ({ backgroundImage, onViewChange, t, VIEWS }) => {
  const quotes = [
    { text: "I have found the one whom my soul loves.", source: "Song of Solomon 3:4" },
    { text: "Two are better than one... If either of them falls down, one can help the other up.", source: "Ecclesiastes 4:9-10" },
    { text: "Let the morning bring me word of your unfailing love, for I have put my trust in you.", source: "Psalm 143:8" },
    { text: "I will betroth you to me forever; I will betroth you in righteousness and justice, in love and compassion.", source: "Hosea 2:19" },
    { text: "I have loved you with an everlasting love; I have drawn you with unfailing kindness.", source: "Jeremiah 31:3" },
    { text: "Love bears all things, believes all things, hopes all things, endures all things.", source: "1 Corinthians 13:7" },
    { text: "Be completely humble and gentle; be patient, bearing with one another in love.", source: "Ephesians 4:2" },
    { text: "No one has ever seen God; but if we love one another, God lives in us and his love is made complete in us.", source: "1 John 4:12" },
    { text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", source: "Galatians 5:22-23" },
    { text: "Therefore what God has joined together, let no one separate.", source: "Mark 10:9" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(intervalId);
  }, [quotes.length]);

  const currentQuote = quotes[currentIndex];
  const bgStyle = { backgroundImage: `url(${backgroundImage})` };

  const handleCrossClick = useCallback(() => {
    onViewChange(VIEWS.LOVE_PAPARAZZI);
    setTimeout(() => {
      const element = document.getElementById('love_paparazzi');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [onViewChange, VIEWS]);

  return (
    <header className="welcome-banner-section">
      <div className="welcome-banner-background-blur" style={bgStyle}></div>
      <div className="welcome-banner-background-clear" style={bgStyle}></div>
      <div className="welcome-banner-content">
        <button onClick={handleCrossClick} className="cross-design-wrapper" aria-label="Learn about our story">
          <div className="cross-design">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 12 V30 M27 35 H45 M73 35 H55" strokeWidth="3"/>
              <circle className="accent-circle" cx="50" cy="8" r="4"/>
              <circle className="accent-circle" cx="23" cy="35" r="4"/>
              <circle className="accent-circle" cx="77" cy="35" r="4"/>
              <circle className="accent-circle" cx="50" cy="35" r="4"/>
              <path d="M50 40 C 40 55, 60 55, 50 70 C 40 85, 60 85, 50 90" strokeWidth="2.5"/>
              <path d="M50 40 C 60 55, 40 55, 50 70 C 60 85, 40 85, 50 90" strokeWidth="2.5"/>
              <path d="M50 40 V 90" strokeWidth="2.5"/>
              <circle className="accent-circle" cx="50" cy="94" r="4"/>
            </svg>
          </div>
        </button>
        <h1 className="welcome-banner-names" dangerouslySetInnerHTML={{ __html: t.welcomeBanner.names }}></h1>
        <p className="welcome-banner-details">{t.welcomeBanner.details}</p>
        <CountdownMemo targetDate="2028-07-01T00:00:00" t={t} />
        <div className="welcome-banner-blessing">
          <p className="blessing-text fade-in-out">"{currentQuote.text}"</p>
          <p className="blessing-source fade-in-out">{currentQuote.source}</p>
        </div>
      </div>
    </header>
  );
};

WelcomeBanner.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
  t: PropTypes.object.isRequired,
  VIEWS: PropTypes.object.isRequired
};

export default WelcomeBanner;
