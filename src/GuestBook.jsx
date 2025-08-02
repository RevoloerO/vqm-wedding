import React from 'react';
import { guestMessages } from './data/guestbookData.js';
import './css/GuestBook.css';
import hqStamp1 from './assets/HQ-stamp-1-nobg.png';

/**
 * GuestBook Component
 * Displays well wishes from guests in a styled format.
 * @param {object} props - Component props.
 * @param {object} props.t - The translation object.
 */
const GuestBook = ({ t }) => {
  return (
    <section id="guestbook" className="page-section guestbook-section">
      <div className="section-header">
        <div className="section-stamp-logo" style={{ maskImage: `url(${hqStamp1})`, WebkitMaskImage: `url(${hqStamp1})` }}></div>
        <h2>{t.nav.wellWishes}</h2>
      </div>
      <div className="guestbook-intro">
        <p>{t.guestbook.intro}</p>
      </div>
      <div className="guestbook-messages-container">
        {guestMessages.map(item => (
          <div key={item.id} className="message-card">
            <p className="message-text">"{item.message}"</p>
            <p className="message-author">- {item.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GuestBook;
