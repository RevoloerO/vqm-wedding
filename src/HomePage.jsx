import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// --- ASSET IMPORT ---
import heroBgImage from './assets/bg-2.jpeg';
import journeyImage from './assets/bg-2.jpeg';
import hqStamp1 from './assets/HQ-stamp-1-nobg.png'; // Rectangular Stamp
import hqStamp2 from './assets/HQ-stamp-2-nobg.png'; // Circular Stamp

// --- CONSTANTS ---
const VIEWS = {
  JOURNEY: 'journey',
  CROSS_SYMBOLISM: 'cross-symbolism',
  LOVE_FACTS: 'love-facts',
  RSVP: 'rsvp',
};

// --- Reusable Components ---

// Countdown Timer for the Wedding
const Countdown = ({ targetDate }) => {
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
};

// --- Page Sections (Views) ---

// Main Welcome Banner (Stays at the top)
const WelcomeBanner = ({ backgroundImage, onViewChange }) => {
    const quotes = [
        { text: "I have found the one whom my soul loves.", source: "Song of Solomon 3:4" },
        { text: "Two are better than one... If either of them falls down, one can help the other up.", source: "Ecclesiastes 4:9-10" },
        { text: "Let the morning bring me word of your unfailing love, for I have put my trust in you.", source: "Psalm 143:8" }
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

    // Function to handle click and navigate to the "Our Cross" section
    const handleCrossClick = () => {
        onViewChange(VIEWS.CROSS_SYMBOLISM);
        // Scroll to the section after a short delay to allow the view to render
        setTimeout(() => {
            const element = document.getElementById('cross-symbolism');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
      <header className="welcome-banner-section">
        <div className="welcome-banner-background-blur" style={bgStyle}></div>
        <div className="welcome-banner-background-clear" style={bgStyle}></div>
        <div className="welcome-banner-content">
          <button onClick={handleCrossClick} className="cross-design-wrapper" aria-label="Learn about our cross">
            <div className="cross-design">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 12 V30 M27 35 H45 M73 35 H55" strokeWidth="3"/>
                  <circle className="accent-circle" cx="50" cy="8" r="4"/>
                  <circle className="accent-circle" cx="23" cy="35" r="4"/>
                  <circle className="accent-circle" cx="77" cy="35" r="4"/>
                  <circle className="accent-circle" cx="50" cy="35" r="5"/>
                  <path d="M50 40 C 40 55, 60 55, 50 70 C 40 85, 60 85, 50 90" strokeWidth="2.5"/>
                  <path d="M50 40 C 60 55, 40 55, 50 70 C 60 85, 40 85, 50 90" strokeWidth="2.5"/>
                  <path d="M50 40 V 90" strokeWidth="2.5"/>
                  <circle className="accent-circle" cx="50" cy="94" r="4"/>
              </svg>
            </div>
          </button>
          <h1 className="welcome-banner-names">Quyen Mai & Hien Dang</h1>
          <p className="welcome-banner-details">July 1, 2028 &nbsp;|&nbsp; Hawaii, USA</p>
          <Countdown targetDate="2028-07-01T00:00:00" />
           <div className="welcome-banner-blessing">
                <p className="blessing-text fade-in-out">"{currentQuote.text}"</p>
                <p className="blessing-source fade-in-out">{currentQuote.source}</p>
            </div>
        </div>
      </header>
    );
};

// Our Journey Section - Reworked as a Book
const OurJourney = () => (
    <section id="journey" className="page-section journey-section">
        <div className="section-content-journey">
            <div className="journey-image-container" style={{ backgroundImage: `url(${journeyImage})` }}>
                {/* This is the background image next to the book */}
            </div>
            <div className="journey-book-container">
                <Link to="/our-full-story" className="journey-book-link">
                    <div className="journey-book">
                        <div className="journey-book-pages">
                            {/* These divs are for the page-edge effect */}
                            <div className="page-edge"></div>
                            <div className="page-edge"></div>
                            <div className="page-edge"></div>
                        </div>
                        <div className="journey-book-cover">
                            <img src={hqStamp2} alt="Quyen & Hien Stamp" className="journey-stamp-logo" />
                            <h2 className="journey-book-title">Our Journey</h2>
                            <p className="journey-book-subtitle">Walking together in faith and love.</p>
                            <div className="journey-book-prompt">
                                <span>Discover Love Story</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </section>
);


// Cord of Three Strands Cross Explanation Section - Reworked as a Newspaper
const CrossNewspaperSection = () => (
    <section id="cross-symbolism" className="page-section cross-newspaper-section">
        <div className="newspaper-header">
            <div className="newspaper-title-line">
                <div className="newspaper-title-item">EST. 2028</div>
                <h2 className="newspaper-headline">The Wedding Chronicle</h2>
                <div className="newspaper-title-item">HAWAII, USA</div>
            </div>
            <div className="newspaper-sub-header">
                <span>A Special Report on Faith &amp; Union</span>
            </div>
        </div>
        <div className="newspaper-content">
            <div className="newspaper-column-left">
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
                <p className="explanation-scripture"><em>"A cord of three strands is not quickly broken."<br/>— Ecclesiastes 4:12</em></p>
            </div>
            <div className="newspaper-column-right">
                <h3 className="explanation-title">The Symbolism of the Three-Strand Cord</h3>
                <div className="symbolism-item">
                    <h4>The Three Strands</h4>
                    <p><span className="drop-cap">I</span>n the Cord of Three Strands ceremony, three separate strands are braided together. These represent the bride, the groom, and God, each being whole and individual before being woven together in holy matrimony.</p>
                </div>
                <div className="symbolism-item">
                    <h4>The Braid</h4>
                    <p><span className="drop-cap">N</span>ewly formed as one, the act of braiding symbolizes the couple's lives being intertwined. It signifies the deliberate inclusion of God as the central, binding force in their union, creating a bond of incredible strength and resilience.</p>
                </div>
                 <div className="symbolism-item">
                    <h4>The Five Wounds</h4>
                    <p><span className="drop-cap">R</span>emembering the ultimate sacrifice, our cross design incorporates five circles symbolizing the Five Holy Wounds of Jesus. This serves as a reminder of the sacrificial love that forms the foundation of a Christian marriage covenant.</p>
                </div>
                <div className="symbolism-item">
                    <h4>A Lasting Reminder</h4>
                    <p><span className="drop-cap">I</span>n our home, this cross will serve as a lasting reminder of the sacred vows we make on our wedding day—a covenant not just between us, but with God at the center of our new life together.</p>
                </div>
            </div>
        </div>
        <img src={hqStamp1} alt="Quyen & Hien Stamp" className="newspaper-stamp-logo" />
    </section>
);

// Love Facts / Celestial Sync Section
const LoveFacts = () => (
    <section id="love-facts" className="page-section love-facts-section">
        <div className="section-header">
             <img src={hqStamp1} alt="Quyen & Hien Stamp" className="section-stamp-logo" />
             <h2>Love Facts</h2>
        </div>
        <div className="fun-facts-container">
            <div className="fact-card">
                <div className="moon-icon waning-crescent"></div>
                <h3>Quyen's Moon</h3>
                <h4>Waning Crescent</h4>
                <p>Born on September 20, 1995, under a Waning Crescent moon. This is a time of quiet reflection, intuition, and dreaming of the future.</p>
            </div>
            <div className="fact-card-connector">+</div>
            <div className="fact-card">
                 <div className="moon-icon waxing-gibbous"></div>
                <h3>Hien's Moon</h3>
                <h4>Waxing Gibbous</h4>
                <p>Born on March 15, 2000, under a Waxing Gibbous moon. This is a time of anticipation, refinement, and nurturing things toward fulfillment.</p>
            </div>
        </div>
        <p className="fun-fact-summary">One was born as the moon rested, the other as it grew towards fullness. Together, your spirits create a perfect, harmonious cycle of reflection and joyful anticipation.</p>
    </section>
);

// RSVP Form Section - NOW INCLUDES SAVE THE DATE
const RsvpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        attending: '',
        attendingChurch: false,
        attendingParty: false,
        song: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    // Event details and calendar link logic from former SaveTheDate component
    const churchCeremony = {
        title: "Wedding Ceremony of Quyen & Hien",
        startDate: '20280701T140000',
        endDate: '20280701T150000',
        location: 'Haiku Mill, Maui, Hawaii',
        description: "The sacred union of Quyen Mai & Hien Dang.",
    };

    const weddingParty = {
        title: "Wedding Party for Quyen & Hien",
        startDate: '20280701T180000',
        endDate: '20280701T230000',
        location: 'The Royal Hawaiian, Oahu, Hawaii',
        description: "Join us for a night of dinner, dancing, and celebration!",
    };

    const createGoogleCalendarUrl = (event) => `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    const createIcsUrl = (event) => {
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${event.startDate}
DTEND:${event.endDate}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
        return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('RSVP Submission:', formData);
        setSubmitted(true);
    };

    const isAttending = formData.attending === 'yes';

    return (
        <section id="rsvp" className="page-section rsvp-section">
            <div className="section-header">
                <img src={hqStamp1} alt="Quyen & Hien Stamp" className="section-stamp-logo" />
                <h2>Event Details & RSVP</h2>
            </div>

            {/* Event Details (formerly Save the Date) */}
            <div className="rsvp-details-container">
                <div className="detail-item">
                    <h3>Church Ceremony</h3>
                    <p><strong>July 1, 2028 at 2:00 PM</strong></p>
                    <p>Haiku Mill, Maui, Hawaii</p>
                     <div className="button-group">
                        <a href={createGoogleCalendarUrl(churchCeremony)} target="_blank" rel="noopener noreferrer" className="button calendar-btn">Google Calendar</a>
                        <a href={createIcsUrl(churchCeremony)} download="wedding-ceremony.ics" className="button calendar-btn">Apple/Outlook</a>
                    </div>
                </div>
                <div className="detail-item">
                    <h3>Wedding Party</h3>
                    <p><strong>July 1, 2028 at 6:00 PM</strong></p>
                    <p>The Royal Hawaiian, Oahu, Hawaii</p>
                     <div className="button-group">
                        <a href={createGoogleCalendarUrl(weddingParty)} target="_blank" rel="noopener noreferrer" className="button calendar-btn">Google Calendar</a>
                        <a href={createIcsUrl(weddingParty)} download="wedding-party.ics" className="button calendar-btn">Apple/Outlook</a>
                    </div>
                </div>
            </div>

            <hr className="rsvp-divider" />

            {submitted ? (
                <div className="thank-you-message">
                    <h3>Thank you!</h3>
                    <p>Your response has been recorded. We can't wait to celebrate with you!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="rsvp-form">
                    <p>Please let us know if you can join our celebration by May 1st, 2028.</p>
                    <div className="form-group">
                        <label htmlFor="name">Full Name(s)</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., John & Jane Doe" required />
                    </div>
                    <div className="form-group">
                        <fieldset>
                            <legend>Will you be joining us?</legend>
                            <div className="radio-group">
                                <label htmlFor="attending-yes" className={formData.attending === 'yes' ? 'selected' : ''}>
                                    <input type="radio" id="attending-yes" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={handleChange} required /> Joyfully Accepts
                                </label>
                                <label htmlFor="attending-no" className={formData.attending === 'no' ? 'selected' : ''}>
                                    <input type="radio" id="attending-no" name="attending" value="no" checked={formData.attending === 'no'} onChange={handleChange} /> Regretfully Declines
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
                                        <input type="checkbox" id="attending-church" name="attendingChurch" checked={formData.attendingChurch} onChange={handleChange} /> Church Ceremony
                                    </label>
                                    <label htmlFor="attending-party" className={formData.attendingParty ? 'selected' : ''}>
                                        <input type="checkbox" id="attending-party" name="attendingParty" checked={formData.attendingParty} onChange={handleChange} /> Wedding Party
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                    )}
                     <div className="form-group">
                        <label htmlFor="song">What song will get you on the dance floor?</label>
                        <input type="text" id="song" name="song" value={formData.song} onChange={handleChange} placeholder="Song Title & Artist" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Leave a message for the couple (optional)</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4"></textarea>
                    </div>
                    <button type="submit" className="button">Submit RSVP</button>
                </form>
            )}
        </section>
    );
};


// --- New Tab Navigation and View Container ---

const TabNavigation = ({ activeView, onViewChange }) => {
  const navItems = [
      { id: VIEWS.JOURNEY, label: 'Our Journey' },
      { id: VIEWS.CROSS_SYMBOLISM, label: 'Our Cross' },
      { id: VIEWS.LOVE_FACTS, label: 'Love Facts' },
      { id: VIEWS.RSVP, label: 'RSVP' }
  ];
  return (
    <nav className="tab-navbar">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`tab-nav-link ${activeView === item.id ? 'active' : ''}`}
          onClick={() => onViewChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

const ViewDisplay = ({ activeView }) => {
  return (
    <div className="view-container">
      {activeView === VIEWS.JOURNEY && <OurJourney />}
      {activeView === VIEWS.CROSS_SYMBOLISM && <CrossNewspaperSection />}
      {activeView === VIEWS.LOVE_FACTS && <LoveFacts />}
      {activeView === VIEWS.RSVP && <RsvpForm />}
    </div>
  );
};

// --- Scroll to Top Button ---
const ScrollToTopButton = ({ isVisible }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
};


// --- Main Page Component ---
function HomePage() {
  const [activeView, setActiveView] = useState(VIEWS.JOURNEY);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="homepage-container">
      <WelcomeBanner backgroundImage={heroBgImage} onViewChange={setActiveView} />
      <div className="tab-navbar-wrapper">
        <TabNavigation activeView={activeView} onViewChange={setActiveView} />
      </div>
      <div className="main-content-area">
        <ViewDisplay activeView={activeView} />
      </div>
      <footer className="footer">
        <p>
            <span className="amdg-wrapper">
                AMDG
                <span className="amdg-tooltip">
                    <strong>Ad Majorem Dei Gloriam</strong>
                    <em>"for the greater glory of God"</em>
                </span>
            </span>
            &nbsp;|&nbsp;Made with love by Quyen & Hien&nbsp;|&nbsp;2028
        </p>
      </footer>
      <ScrollToTopButton isVisible={showScrollButton} />
    </div>
  );
}

export default HomePage;
