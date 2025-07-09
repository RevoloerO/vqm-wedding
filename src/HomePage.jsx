import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// --- Reusable Components ---

// Themed Logo
const HQLogo = () => (
  <div className="wedding-logo">
    <div className='wedding-logo-box'>
      <div className="logo-text" id='logo-text-1'>Quy</div>
      <div className="logo-text" id='logo-text-2'>& Hi</div>
    </div>
    <div className="logo-text" id='logo-text-3'>en</div>
  </div>
);

// Countdown Timer for the Wedding
const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
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
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="countdown">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="countdown-item">
          <div className="countdown-value">{value}</div>
          <div className="countdown-unit">{unit}</div>
        </div>
      ))}
    </div>
  );
};

// --- Page Sections (Views) ---

// Main Hero Section (Stays at the top)
const Hero = () => {
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
        }, 7000); // Change quote every 7 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [quotes.length]);

    const currentQuote = quotes[currentIndex];

    return (
      <header className="hero-section">
        <div className="hero-background-blur"></div>
        <div className="hero-background-clear"></div>
        <div className="hero-content">
          <div className="cross-design"></div>
          <h1 className="hero-names">Quyen Mai & Hien Dang</h1>
          <p className="hero-details">July 1, 2028 &nbsp;|&nbsp; Hawaii, USA</p>
          <Countdown targetDate="2028-07-01T00:00:00" />
           <div className="hero-blessing">
                <p className="blessing-text fade-in-out">"{currentQuote.text}"</p>
                <p className="blessing-source fade-in-out">{currentQuote.source}</p>
            </div>
        </div>
      </header>
    );
};

// Our Journey Section
const OurJourney = () => (
    <section id="journey" className="page-section journey-section">
        <div className="section-header">
            <HQLogo />
            <h2>Our Journey</h2>
        </div>
        <div className="section-content-journey">
            <div className="journey-image-container">
                {/* This div is now styled with the background image via CSS */}
            </div>
            <div className="journey-text-container">
                <p>Our journey together began with a shared love for matcha lattes and quiet afternoons. It has since blossomed into a life filled with laughter, adventure, and countless beautiful memories. We are so excited to start this next chapter and couldn't have done it without the love and support from all of you...</p>
                <a href="/our-journey" className="button">Read Our Full Journey</a>
            </div>
        </div>
    </section>
);

// Fun Facts / Celestial Sync Section
const CelestialSync = () => (
    <section id="fun-facts" className="page-section fun-facts-section">
        <h2>Celestial Sync</h2>
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


// Save the Date Section
const SaveTheDate = () => {
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

    return (
        <section id="save-the-date" className="page-section save-the-date-section">
            <div className="section-header">
                <HQLogo />
                <h2>Save the Date</h2>
            </div>
            <div className="details-container">
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
        </section>
    );
};

// RSVP Form Section
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd send this data to a server.
        console.log('RSVP Submission:', formData);
        setSubmitted(true);
    };

    const isAttending = formData.attending === 'yes';

    return (
        <section id="rsvp" className="page-section rsvp-section">
            <div className="section-header">
                <HQLogo />
                <h2>Kindly Respond</h2>
            </div>
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
                                <label className={formData.attending === 'yes' ? 'selected' : ''}>
                                    <input type="radio" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={handleChange} required /> Joyfully Accepts
                                </label>
                                <label className={formData.attending === 'no' ? 'selected' : ''}>
                                    <input type="radio" name="attending" value="no" checked={formData.attending === 'no'} onChange={handleChange} /> Regretfully Declines
                                </label>
                            </div>
                        </fieldset>
                    </div>
                    {isAttending && (
                        <div className="form-group fade-in">
                             <fieldset>
                                <legend>Which events will you attend?</legend>
                                <div className="checkbox-group">
                                    <label className={formData.attendingChurch ? 'selected' : ''}>
                                        <input type="checkbox" name="attendingChurch" checked={formData.attendingChurch} onChange={handleChange} /> Church Ceremony
                                    </label>
                                    <label className={formData.attendingParty ? 'selected' : ''}>
                                        <input type="checkbox" name="attendingParty" checked={formData.attendingParty} onChange={handleChange} /> Wedding Party
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
      { id: 'journey', label: 'Our Journey' },
      { id: 'save-the-date', label: 'Save the Date' },
      { id: 'fun-facts', label: 'Fun Facts' },
      { id: 'rsvp', label: 'RSVP' }
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
      {activeView === 'journey' && <OurJourney />}
      {activeView === 'save-the-date' && <SaveTheDate />}
      {activeView === 'fun-facts' && <CelestialSync />}
      {activeView === 'rsvp' && <RsvpForm />}
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
  const [activeView, setActiveView] = useState('journey');
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Logic for scroll to top button
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="homepage-container">
      <Hero />
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
