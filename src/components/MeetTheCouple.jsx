/**
 * MeetTheCouple Component
 * Flippable invitation card with couple's bios
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const MeetTheCouple = ({ emblemImage, t }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Helper to format the name with line breaks for desktop
  const formatName = useCallback((name) => {
    return name.split(' ').join('<br/>');
  }, []);

  const handleCardClick = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  return (
    <section className="page-section meet-the-couple-section">
      <div className="invitation-card-container" onClick={handleCardClick}>
        <div className={`invitation-card ${isFlipped ? 'is-flipped' : ''}`}>
          {/* Front of the card */}
          <div className="invitation-card-face invitation-card-front">
            <div className="invitation-bg-emblem"></div>

            {/* Desktop-only view */}
            <div className="invitation-column desktop-only">
              <div className="person-title">{t.meetTheCouple.groomTitle}</div>
              <h3
                className="person-name"
                dangerouslySetInnerHTML={{ __html: formatName(t.meetTheCouple.groomName) }}
              ></h3>
              <p className="person-bio">{t.meetTheCouple.groomBio}</p>
            </div>

            <div className="invitation-center-divider desktop-only">
              <img src={emblemImage} alt="Double Happiness Emblem" className="invitation-emblem" />
            </div>

            <div className="invitation-column desktop-only">
              <div className="person-title">{t.meetTheCouple.brideTitle}</div>
              <h3
                className="person-name"
                dangerouslySetInnerHTML={{ __html: formatName(t.meetTheCouple.brideName) }}
              ></h3>
              <p className="person-bio">{t.meetTheCouple.brideBio}</p>
            </div>

            {/* Mobile-only view */}
            <div className="mobile-only-front-content">
              <div className="mobile-names-container">
                <div className="invitation-column">
                  <div className="person-title">{t.meetTheCouple.groomTitle}</div>
                  <h3 className="person-name">{t.meetTheCouple.groomName}</h3>
                </div>
                <div className="invitation-column">
                  <div className="person-title">{t.meetTheCouple.brideTitle}</div>
                  <h3 className="person-name">{t.meetTheCouple.brideName}</h3>
                </div>
              </div>
              <div className="invitation-center-divider">
                <img src={emblemImage} alt="Double Happiness Emblem" className="invitation-emblem" />
              </div>
              <div className="mobile-tap-prompt">
                <span>The Couple's Bio &gt;</span>
              </div>
            </div>
          </div>

          {/* Back of the card (Mobile only) */}
          <div className="invitation-card-face invitation-card-back">
            <div className="invitation-card-back-content">
              <div className="invitation-column">
                <p className="person-bio">{t.meetTheCouple.groomBio}</p>
              </div>
              <div className="invitation-center-divider back-divider"></div>
              <div className="invitation-column">
                <p className="person-bio">{t.meetTheCouple.brideBio}</p>
              </div>
              <div className="mobile-tap-prompt back">
                <span>Tap to return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MeetTheCouple.propTypes = {
  emblemImage: PropTypes.string.isRequired,
  t: PropTypes.object.isRequired
};

export default MeetTheCouple;
