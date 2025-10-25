/**
 * RsvpForm Component
 * Event details and RSVP form
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const RsvpForm = ({ churchCeremony, weddingParty, stampImage, t }) => {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    attendingChurch: false,
    attendingParty: false,
    song: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const createGoogleCalendarUrl = useCallback((event) =>
    `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`,
    []
  );

  const createIcsUrl = useCallback((event) =>
    `data:text/calendar;charset=utf8,${encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:${window.location.href}\nDTSTART:${event.startDate}\nDTEND:${event.endDate}\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nLOCATION:${event.location}\nEND:VEVENT\nEND:VCALENDAR`)}`,
    []
  );

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('RSVP Submission:', formData);
    setSubmitted(true);
  }, [formData]);

  const isAttending = formData.attending === 'yes';

  return (
    <section id="rsvp" className="page-section rsvp-section">
      <div className="section-header">
        <div
          className="section-stamp-logo"
          style={{
            maskImage: `url(${stampImage})`,
            WebkitMaskImage: `url(${stampImage})`
          }}
        ></div>
        <h2>Event Details & RSVP</h2>
      </div>

      <div className="rsvp-details-container">
        <div className="detail-item">
          <h3>Church Ceremony</h3>
          <p><strong>July 1, 2028 at 2:00 PM</strong></p>
          <p>St. Joseph Cathedral, Columbus, OH</p>
          <div className="button-group">
            <a
              href={createGoogleCalendarUrl(churchCeremony)}
              target="_blank"
              rel="noopener noreferrer"
              className="button calendar-btn"
            >
              Google Calendar
            </a>
            <a
              href={createIcsUrl(churchCeremony)}
              download="wedding-ceremony.ics"
              className="button calendar-btn"
            >
              Apple/Outlook
            </a>
          </div>
        </div>

        <div className="detail-item">
          <h3>Wedding Party</h3>
          <p><strong>July 1, 2028 at 6:00 PM</strong></p>
          <p>The Westin Great Southern, Columbus, OH</p>
          <div className="button-group">
            <a
              href={createGoogleCalendarUrl(weddingParty)}
              target="_blank"
              rel="noopener noreferrer"
              className="button calendar-btn"
            >
              Google Calendar
            </a>
            <a
              href={createIcsUrl(weddingParty)}
              download="wedding-party.ics"
              className="button calendar-btn"
            >
              Apple/Outlook
            </a>
          </div>
        </div>
      </div>

      <hr className="rsvp-divider" />

      {submitted ? (
        <div className="thank-you-message">
          <h3>{t.rsvp.thankYouTitle}</h3>
          <p>{t.rsvp.thankYouMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rsvp-form">
          <p>Please let us know if you can join our celebration by May 1st, 2028.</p>

          <div className="form-group">
            <label htmlFor="name">Full Name(s)</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John & Jane Doe"
              required
            />
          </div>

          <div className="form-group">
            <fieldset>
              <legend>Will you be joining us?</legend>
              <div className="radio-group">
                <label htmlFor="attending-yes" className={formData.attending === 'yes' ? 'selected' : ''}>
                  <input
                    type="radio"
                    id="attending-yes"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleChange}
                    required
                  />
                  Joyfully Accepts
                </label>
                <label htmlFor="attending-no" className={formData.attending === 'no' ? 'selected' : ''}>
                  <input
                    type="radio"
                    id="attending-no"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleChange}
                  />
                  Regretfully Declines
                </label>
              </div>
            </fieldset>
          </div>

          {isAttending && (
            <div className="form-group fade-in">
              <fieldset>
                <legend>Which events will you attend?</legend>
                <div className="checkbox-group">
                  <label htmlFor="attending-church" className={formData.attendingChurch ? 'selected' : ''}>
                    <input
                      type="checkbox"
                      id="attending-church"
                      name="attendingChurch"
                      checked={formData.attendingChurch}
                      onChange={handleChange}
                    />
                    Church Ceremony
                  </label>
                  <label htmlFor="attending-party" className={formData.attendingParty ? 'selected' : ''}>
                    <input
                      type="checkbox"
                      id="attending-party"
                      name="attendingParty"
                      checked={formData.attendingParty}
                      onChange={handleChange}
                    />
                    Wedding Party
                  </label>
                </div>
              </fieldset>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="song">What song will get you on the dance floor?</label>
            <input
              type="text"
              id="song"
              name="song"
              value={formData.song}
              onChange={handleChange}
              placeholder="Song Title & Artist"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Leave a message for the couple (optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="button">Submit RSVP</button>
        </form>
      )}
    </section>
  );
};

RsvpForm.propTypes = {
  churchCeremony: PropTypes.shape({
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  weddingParty: PropTypes.shape({
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  stampImage: PropTypes.string.isRequired,
  t: PropTypes.object.isRequired
};

export default RsvpForm;
