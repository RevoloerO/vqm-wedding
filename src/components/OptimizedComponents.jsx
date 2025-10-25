/**
 * Optimized Components with React.memo
 * These are memoized versions of pure components to prevent unnecessary re-renders
 */

import React, { memo, useCallback, useState, useEffect } from 'react';

/**
 * Optimized Countdown Timer
 * Only re-renders when targetDate or translation changes
 */
export const CountdownMemo = memo(({ targetDate, t }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="countdown">
      {Object.keys(timeLeft).length > 0 ? (
        Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="countdown-item">
            <div className="countdown-value">{value}</div>
            <div className="countdown-unit">{unit}</div>
          </div>
        ))
      ) : (
        <div className="countdown-item">
          <div className="countdown-value">0</div>
          <div className="countdown-unit">Days</div>
        </div>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if these props change
  return prevProps.targetDate === nextProps.targetDate &&
         prevProps.t === nextProps.t;
});

CountdownMemo.displayName = 'CountdownMemo';

/**
 * Optimized Schedule Item
 * Pure component - only re-renders when props change
 */
export const ScheduleItemMemo = memo(({ icon, title, time, description, location }) => (
  <div className="schedule-item">
    <div className="schedule-icon" dangerouslySetInnerHTML={{ __html: icon }} />
    <div className="schedule-content">
      <h3>{title}</h3>
      <p className="schedule-time">{time}</p>
      <p>{description}</p>
      <p className="schedule-location">{location}</p>
    </div>
  </div>
));

ScheduleItemMemo.displayName = 'ScheduleItemMemo';

/**
 * Optimized Cross Design SVG
 * Static component - never needs to re-render after mount
 */
export const CrossDesignMemo = memo(({ onClick, ariaLabel = "Learn about our story" }) => (
  <button onClick={onClick} className="cross-design-wrapper" aria-label={ariaLabel}>
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
));

CrossDesignMemo.displayName = 'CrossDesignMemo';

/**
 * Optimized Moon Phase Visualization
 * Only re-renders when animation state changes
 */
export const MoonVisualizationMemo = memo(({
  isAnimated,
  onToggle,
  labels,
  quyensMoonLabel,
  hiensMoonLabel,
  ourMoonLabel,
  fullMoonLabel,
  waningCrescentLabel,
  waxingGibbousLabel
}) => (
  <div
    className={`moon-visualization-container ${isAnimated ? 'active-moon-animation' : ''}`}
    onClick={onToggle}
  >
    <div className="moon-wrapper">
      <div className="moon-icon waning-crescent"></div>
      <p className="moon-label">{quyensMoonLabel}</p>
      <p className="moon-phase-name">{waningCrescentLabel}</p>
    </div>
    <div className="moon-wrapper">
      <div className="moon-icon waxing-gibbous"></div>
      <p className="moon-label">{hiensMoonLabel}</p>
      <p className="moon-phase-name">{waxingGibbousLabel}</p>
    </div>
    <div className="moon-combined-label">
      <p className="moon-combined-main">{ourMoonLabel}</p>
      <p className="moon-combined-sub">{fullMoonLabel}</p>
    </div>
  </div>
), (prevProps, nextProps) => {
  return prevProps.isAnimated === nextProps.isAnimated &&
         prevProps.quyensMoonLabel === nextProps.quyensMoonLabel &&
         prevProps.hiensMoonLabel === nextProps.hiensMoonLabel;
});

MoonVisualizationMemo.displayName = 'MoonVisualizationMemo';

/**
 * Optimized Scroll to Top Button
 * Only re-renders when visibility changes
 */
export const ScrollToTopButtonMemo = memo(({ isVisible }) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  );
}, (prevProps, nextProps) => prevProps.isVisible === nextProps.isVisible);

ScrollToTopButtonMemo.displayName = 'ScrollToTopButtonMemo';

/**
 * Optimized Language Switcher
 * Only re-renders when language changes
 */
export const LanguageSwitcherMemo = memo(({ language, onToggle }) => {
  const handleToggle = useCallback(() => {
    onToggle();
  }, [onToggle]);

  return (
    <div className="utility-bar">
      <div
        className="lang-switcher"
        onClick={handleToggle}
        role="button"
        tabIndex="0"
        onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle()}
        aria-label={`Switch to ${language === 'en' ? 'Vietnamese' : 'English'}`}
      >
        <div className={`lang-slider ${language === 'vn' ? 'vn-active' : ''}`}></div>
        <span className={`lang-btn ${language === 'en' ? 'active' : ''}`}>EN</span>
        <span className={`lang-btn ${language === 'vn' ? 'active' : ''}`}>VN</span>
      </div>
    </div>
  );
}, (prevProps, nextProps) => prevProps.language === nextProps.language);

LanguageSwitcherMemo.displayName = 'LanguageSwitcherMemo';
