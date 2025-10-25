/**
 * Schedule Component
 * Wedding day timeline with icons
 */

import React from 'react';
import PropTypes from 'prop-types';

const scheduleItems = [
  {
    id: 'ceremony',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M8 9H4v10h4V9zm8 0h4v10h-4V9z"/><path d="M4 9V5l8-3 8 3v4"/></svg>',
    key: 'ceremony'
  },
  {
    id: 'cocktail',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></svg>',
    key: 'cocktail'
  },
  {
    id: 'dinner',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    key: 'dinner'
  },
  {
    id: 'exit',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v9c0 .6.4 1 1 1h3"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
    key: 'exit'
  }
];

const Schedule = ({ stampImage, t }) => (
  <section id="schedule" className="page-section schedule-section">
    <div className="section-header">
      <div
        className="section-stamp-logo"
        style={{
          maskImage: `url(${stampImage})`,
          WebkitMaskImage: `url(${stampImage})`
        }}
      ></div>
      <h2>{t.schedule.title}</h2>
    </div>
    <div className="schedule-timeline-container">
      {scheduleItems.map(item => (
        <div key={item.id} className="schedule-item">
          <div className="schedule-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
          <div className="schedule-content">
            <h3>{t.schedule[item.key]}</h3>
            <p className="schedule-time">{t.schedule[`${item.key}Time`]}</p>
            <p>{t.schedule[`${item.key}Desc`]}</p>
            <p className="schedule-location">{t.schedule[`${item.key}Location`]}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

Schedule.propTypes = {
  stampImage: PropTypes.string.isRequired,
  t: PropTypes.object.isRequired
};

export default Schedule;
