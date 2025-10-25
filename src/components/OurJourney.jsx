/**
 * OurJourney Component
 * Book-style journey section
 */

import React from 'react';
import PropTypes from 'prop-types';

const OurJourney = ({ onNavigate, journeyImage, stampImage, t }) => (
  <section id="journey" className="page-section journey-section">
    <div className="section-content-journey">
      <div className="journey-image-container" style={{ backgroundImage: `url(${journeyImage})` }}>
        {/* Background image next to the book */}
      </div>
      <div className="journey-book-container">
        <a href="/our-full-story" onClick={onNavigate} className="journey-book-link">
          <div className="journey-book">
            <div className="journey-book-pages">
              <div className="page-edge"></div>
              <div className="page-edge"></div>
              <div className="page-edge"></div>
            </div>
            <div className="journey-book-cover">
              <div
                className="journey-stamp-wrapper"
                style={{
                  WebkitMaskImage: `url(${stampImage})`,
                  maskImage: `url(${stampImage})`
                }}
              />
              <h2 className="journey-book-title">{t.journey.title}</h2>
              <p className="journey-book-subtitle">{t.journey.subtitle}</p>
              <div className="journey-book-prompt">
                <span>{t.journey.prompt}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
);

OurJourney.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  journeyImage: PropTypes.string.isRequired,
  stampImage: PropTypes.string.isRequired,
  t: PropTypes.object.isRequired
};

export default OurJourney;
