/**
 * LovePaparazziSection Component
 * Newspaper-style article section with three-strand cord, moon phases, and ring stories
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MoonVisualizationMemo } from './OptimizedComponents';

const LovePaparazziSection = ({ stamp1, stamp2, t }) => {
  const [isMoonAnimated, setIsMoonAnimated] = useState(false);

  const toggleMoonAnimation = useCallback(() => {
    setIsMoonAnimated(prev => !prev);
  }, []);

  return (
    <section id="love_paparazzi" className="page-section love-paparazzi-newspaper-section">
      <div className="cross-newspaper-page">
        <div className="cross-newspaper-masthead">
          <div className="masthead-title">{t.lovePaparazzi.masthead}</div>
          <div className="masthead-subheading">
            <span>Vol. IV, No. 12</span>
            <span>A.D. July 1, 2028</span>
            <span>Price: One Prayer</span>
          </div>
        </div>

        <nav className="article-nav">
          <a href="#article-cord">{t.lovePaparazzi.articleNavCord}</a>
          <span className="article-nav-divider">|</span>
          <a href="#article-moon">{t.lovePaparazzi.articleNavMoon}</a>
          <span className="article-nav-divider">|</span>
          <a href="#article-ring">{t.lovePaparazzi.articleNavRing}</a>
        </nav>

        {/* Three-Strand Cord Article */}
        <div id="article-cord" className="cross-newspaper-article">
          <h2 className="article-headline">{t.lovePaparazzi.cordHeadline}</h2>
          <div className="article-content">
            <div className="article-column-visual">
              <div className="explanation-visual">
                <svg className="explanation-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <g className="explanation-glow-group">
                    <path d="M50 12 V30 M27 35 H45 M73 35 H55" strokeWidth="3"/>
                    <path d="M50 40 C 40 55, 60 55, 50 70 C 40 85, 60 85, 50 90" strokeWidth="2.5"/>
                    <path d="M50 40 C 60 55, 40 55, 50 70 C 60 85, 40 85, 50 90" strokeWidth="2.5"/>
                    <path d="M50 40 V 90" strokeWidth="2.5"/>
                  </g>
                  <circle className="accent-circle" cx="50" cy="8" r="4"/>
                  <circle className="accent-circle" cx="23" cy="35" r="4"/>
                  <circle className="accent-circle" cx="77" cy="35" r="4"/>
                  <circle className="accent-circle" cx="50" cy="35" r="5"/>
                  <circle className="accent-circle" cx="50" cy="94" r="4"/>
                </svg>
              </div>
              <p className="explanation-scripture"><em>{t.lovePaparazzi.cordScripture}</em></p>
            </div>
            <div className="article-column-text">
              <div className="article-paragraph">
                <h4 className="article-paragraph-title">{t.lovePaparazzi.cordStrandsTitle}</h4>
                <p>{t.lovePaparazzi.cordStrandsText}</p>
              </div>
              <div className="article-paragraph">
                <h4 className="article-paragraph-title">{t.lovePaparazzi.cordBraidTitle}</h4>
                <p>{t.lovePaparazzi.cordBraidText}</p>
              </div>
              <div className="article-paragraph">
                <h4 className="article-paragraph-title">{t.lovePaparazzi.cordWoundsTitle}</h4>
                <p>{t.lovePaparazzi.cordWoundsText}</p>
              </div>
              <div className="article-paragraph">
                <h4 className="article-paragraph-title">{t.lovePaparazzi.cordReminderTitle}</h4>
                <p>{t.lovePaparazzi.cordReminderText}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stamp between articles */}
        <div className="love-paparazzi-stamp-container">
          <div
            className="love-paparazzi-stamp"
            style={{
              maskImage: `url(${stamp1})`,
              WebkitMaskImage: `url(${stamp1})`
            }}
          ></div>
        </div>

        {/* Moon Phase Article */}
        <div id="article-moon" className="moon-phase-article">
          <h2 className="article-headline" dangerouslySetInnerHTML={{ __html: t.lovePaparazzi.moonPhase.headline }}></h2>

          <MoonVisualizationMemo
            isAnimated={isMoonAnimated}
            onToggle={toggleMoonAnimation}
            quyensMoonLabel={t.lovePaparazzi.moonPhase.quyensMoon}
            hiensMoonLabel={t.lovePaparazzi.moonPhase.hiensMoon}
            ourMoonLabel={t.lovePaparazzi.moonPhase.ourMoon}
            fullMoonLabel={t.lovePaparazzi.moonPhase.fullMoon}
            waningCrescentLabel={t.lovePaparazzi.moonPhase.waningCrescent}
            waxingGibbousLabel={t.lovePaparazzi.moonPhase.waxingGibbous}
          />

          <div className="moon-explanation-text">
            <p className="moon-intro-paragraph" dangerouslySetInnerHTML={{ __html: t.lovePaparazzi.moonPhase.intro }}></p>
            <div className="moon-facts-container">
              <div className="moon-person-fact">
                <p className="moon-person-name">
                  {t.meetTheCouple.groomName}
                  <span className="birth-date">{t.lovePaparazzi.moonPhase.quyenDob}</span>
                </p>
                <p className="moon-phase-detail" dangerouslySetInnerHTML={{ __html: t.lovePaparazzi.moonPhase.quyenPhase }}></p>
                <p className="moon-description" dangerouslySetInnerHTML={{ __html: t.lovePaparazzi.moonPhase.quyenDesc }}></p>
              </div>

              <div className="moon-person-fact">
                <p className="moon-person-name">
                  {t.meetTheCouple.brideName}
                  <span className="birth-date">{t.lovePaparazzi.moonPhase.hienDob}</span>
                </p>
                <p className="moon-phase-detail" dangerouslySetInnerHTML={{ __html: t.lovePaparazzi.moonPhase.hienPhase }}></p>
                <p className="moon-description" dangerouslySetInnerHTML={{ __html: t.lovePaparazzi.moonPhase.hienDesc }}></p>
              </div>
            </div>

            <p className="moon-summary" dangerouslySetInnerHTML={{ __html: t.lovePaparazzi.moonPhase.summary }}></p>
          </div>
        </div>

        {/* Stamp between articles */}
        <div className="love-paparazzi-stamp-container">
          <div
            className="love-paparazzi-stamp"
            style={{
              maskImage: `url(${stamp2})`,
              WebkitMaskImage: `url(${stamp2})`,
              width: "120px",
              height: "120px",
              transform: 'translate(-50%, -50%) rotate(5deg)'
            }}
          ></div>
        </div>

        {/* Ring Article */}
        <div id="article-ring" className="cross-newspaper-article">
          <h2 className="article-headline">{t.lovePaparazzi.ringHeadline}</h2>
          <div className="article-content ring-article-layout">
            <div className="article-column-visual">
              <div className="ring-image-placeholder">
                <img
                  src="https://placehold.co/400x500/e0dccc/36454F?text=Our+Ring"
                  alt="Our engagement ring"
                  className="ring-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x500/cccccc/ffffff?text=Image+Coming+Soon';
                  }}
                />
              </div>
              <p className="explanation-scripture" style={{textAlign: 'center', background: 'transparent', padding: '1rem 0'}}>
                <em>{t.lovePaparazzi.ringScripture}</em>
              </p>
            </div>
            <div className="article-column-text">
              <div className="article-paragraph">
                <h4 className="article-paragraph-title">{t.lovePaparazzi.ringSubstanceTitle}</h4>
                <p>{t.lovePaparazzi.ringSubstanceText}</p>
              </div>
              <div className="article-paragraph">
                <h4 className="article-paragraph-title">{t.lovePaparazzi.ringRippleTitle}</h4>
                <p>{t.lovePaparazzi.ringRippleText}</p>
              </div>
              <div className="article-paragraph">
                <h4 className="article-paragraph-title">{t.lovePaparazzi.ringPromiseTitle}</h4>
                <p>{t.lovePaparazzi.ringPromiseText}</p>
              </div>
              <div className="article-paragraph article-source-link">
                <p>
                  {t.lovePaparazzi.ringLink}{' '}
                  <a href="https://www.doamore.com/impact" target="_blank" rel="noopener noreferrer">
                    Do Amore website
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

LovePaparazziSection.propTypes = {
  stamp1: PropTypes.string.isRequired,
  stamp2: PropTypes.string.isRequired,
  t: PropTypes.object.isRequired
};

export default LovePaparazziSection;
