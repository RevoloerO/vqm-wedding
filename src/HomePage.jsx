import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './css/base.css';
import './css/sections.css';
import './css/components.css';
import './css/responsive.css';

// --- ASSET IMPORT ---
import heroBgImage from './assets/bg-2.jpeg';
import journeyImage from './assets/bg-2.jpeg';
import hqStamp1 from './assets/HQ-stamp-1-nobg.png'; // Rectangular Stamp
import hqStamp2 from './assets/HQ-stamp-2-nobg.png'; // Circular Stamp
import hqStamp3 from './assets/HQ-stamp-3-nobg.png'; // New stamp for schedule
import hqArt from './assets/HQ-art.png'; // Footer Art

// --- CONSTANTS ---
const VIEWS = {
  JOURNEY: 'journey',
  OUR_CROSS: 'our_cross',
  SCHEDULE: 'schedule',
  PHOTOBOOK: 'photobook',
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

    const handleCrossClick = () => {
        onViewChange(VIEWS.OUR_CROSS);
        setTimeout(() => {
            const element = document.getElementById('our_cross');
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
          <button onClick={handleCrossClick} className="cross-design-wrapper" aria-label="Learn about our story">
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
          <p className="welcome-banner-details">July 1, 2028 &nbsp;|&nbsp; Columbus, OH</p>
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
                            <div className="page-edge"></div>
                            <div className="page-edge"></div>
                            <div className="page-edge"></div>
                        </div>
                        <div className="journey-book-cover">
                            <div
                              className="journey-stamp-wrapper"
                              style={{
                                WebkitMaskImage: `url(${hqStamp2})`,
                                maskImage: `url(${hqStamp2})`
                              }}
                            />
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

// --- REVISED: Our Cross Section as a Newspaper Article ---
const OurCrossSection = () => {
    const moonSectionRef = useRef(null);
    const [isMoonSectionVisible, setMoonSectionVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setMoonSectionVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.5, // Trigger when 50% of the element is visible
            }
        );

        if (moonSectionRef.current) {
            observer.observe(moonSectionRef.current);
        }

        return () => {
            if (moonSectionRef.current) {
                observer.unobserve(moonSectionRef.current);
            }
        };
    }, []);


    return (
        <section id="our_cross" className="page-section cross-newspaper-section">
            <div className="cross-newspaper-page">
                <div className="cross-newspaper-masthead">
                    <div className="masthead-title">The Covenant Chronicle</div>
                    <div className="masthead-subheading">
                        <span>Vol. IV, No. 12</span>
                        <span>A.D. July 1, 2028</span>
                        <span>Price: One Prayer</span>
                    </div>
                </div>

                <div className="cross-newspaper-article">
                    <h2 className="article-headline">On the Symbolism of the Three-Strand Cord</h2>
                    <div className="article-content">
                        <div className="article-column-visual">
                            <div className="explanation-visual">
                                <svg className="explanation-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <g className="explanation-glow-group"><path d="M50 12 V30 M27 35 H45 M73 35 H55" strokeWidth="3"/><path d="M50 40 C 40 55, 60 55, 50 70 C 40 85, 60 85, 50 90" strokeWidth="2.5"/><path d="M50 40 C 60 55, 40 55, 50 70 C 60 85, 40 85, 50 90" strokeWidth="2.5"/><path d="M50 40 V 90" strokeWidth="2.5"/></g>
                                    <circle className="accent-circle" cx="50" cy="8" r="4"/><circle className="accent-circle" cx="23" cy="35" r="4"/><circle className="accent-circle" cx="77" cy="35" r="4"/><circle className="accent-circle" cx="50" cy="35" r="5"/><circle className="accent-circle" cx="50" cy="94" r="4"/>
                                </svg>
                            </div>
                            <p className="explanation-scripture"><em>"A cord of three strands is not quickly broken."<br/>— Ecclesiastes 4:12</em></p>
                        </div>
                        <div className="article-column-text">
                            <p><span className="drop-cap">I</span>n the Cord of Three Strands ceremony, three separate strands are braided together. These represent the bride, the groom, and God, each being whole and individual before being woven together.</p>
                            <p><span className="drop-cap">N</span>ewly formed as one, the act of braiding symbolizes the couple's lives being intertwined. It signifies the deliberate inclusion of God as the central, binding force in their union.</p>
                            <p><span className="drop-cap">R</span>emembering the ultimate sacrifice, our cross design incorporates five circles symbolizing the Five Holy Wounds of Jesus, a reminder of the sacrificial love that forms the foundation of a Christian marriage.</p>
                            <p><span className="drop-cap">I</span>n our home, this cross will serve as a lasting reminder of the sacred vows we make on our wedding day—a covenant not just between us, but with God at the center of our new life together.</p>
                        </div>
                    </div>
                </div>

                {/* REVISED Moon Phase Article */}
                <div className="moon-phase-article" ref={moonSectionRef}>
                    <h3 className="article-headline">A Celestial Sync: Written in the Stars</h3>
                    <div className={`fun-facts-container ${isMoonSectionVisible ? 'animate' : ''}`}>
                        <div className="fact-card">
                            <div className="moon-icon waning-crescent-icon"></div>
                            <h3>Quyen's Moon</h3>
                            <h4><strong>Waning Crescent</strong></h4>
                            <p>Born under a <strong>Waning Crescent</strong> moon, a time for quiet reflection, release, and dreaming of the future.</p>
                        </div>
                        <div className="fact-card-connector">+</div>
                        <div className="fact-card">
                            <div className="moon-icon waxing-gibbous-icon"></div>
                            <h3>Hien's Moon</h3>
                            <h4><strong>Waxing Gibbous</strong></h4>
                            <p>Born under a <strong>Waxing Gibbous</strong> moon, a time for anticipation, refinement, and nurturing things toward fulfillment.</p>
                        </div>
                    </div>
                    <p className={`fun-fact-summary ${isMoonSectionVisible ? 'animate' : ''}`}>As one moon rests and dreams, the other grows toward fullness. A celestial balance of introspection and anticipation, their spirits align to create a complete and harmonious cycle of love.</p>
                </div>
            </div>
        </section>
    );
};


// Reworked Wedding Day Schedule Section with Timeline and new Icons
const WeddingDaySchedule = () => (
    <section id="schedule" className="page-section schedule-section">
        <div className="section-header">
            <img src={hqStamp3} alt="Quyen & Hien Stamp" className="section-stamp-logo" />
            <h2>Our Wedding Day</h2>
        </div>
        <div className="schedule-timeline-container">
            <div className="schedule-item"><div className="schedule-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M8 9H4v10h4V9zm8 0h4v10h-4V9z"/><path d="M4 9V5l8-3 8 3v4"/></svg></div><div className="schedule-content"><h3>Church Ceremony</h3><p className="schedule-time">2:00 PM</p><p>Join us as we exchange vows and begin our journey as one.</p><p className="schedule-location">St. Joseph Cathedral, Columbus, OH</p></div></div>
            <div className="schedule-item"><div className="schedule-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></svg></div><div className="schedule-content"><h3>Cocktail Hour</h3><p className="schedule-time">6:00 PM</p><p>Enjoy drinks and appetizers before the main celebration begins.</p><p className="schedule-location">The Westin Great Southern, Columbus, OH</p></div></div>
            <div className="schedule-item"><div className="schedule-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div><div className="schedule-content"><h3>Dinner & Celebration</h3><p className="schedule-time">7:15 PM</p><p>Dine, dance, and celebrate with us through the night.</p><p className="schedule-location">The Westin Great Southern, Columbus, OH</p></div></div>
            <div className="schedule-item"><div className="schedule-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v9c0 .6.4 1 1 1h3"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></div><div className="schedule-content"><h3>Grand Exit</h3><p className="schedule-time">11:00 PM</p><p>Help us end our special day with a memorable send-off!</p><p className="schedule-location">The Westin Great Southern, Columbus, OH</p></div></div>
        </div>
    </section>
);

// --- Guest Photobook Section ---
const GuestPhotobook = () => (
    <section id="photobook" className="page-section photobook-section">
        <div className="section-header">
            <img src={hqStamp1} alt="Quyen & Hien Stamp" className="section-stamp-logo" />
            <h2>Guest Photobook</h2>
        </div>
        <div className="photobook-intro">
            <p>Share your favorite moments from our special day! We've set up a Google Form to collect photos from our beloved guests. Your pictures will be a cherished part of our wedding album.</p>
            <p>Please upload your photos and share a memory with us below.</p>
        </div>
        <div className="google-form-embed-container">
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSflv_2y3tL9w7_p4z4v5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q/viewform?embedded=true"
                width="100%" height="800" frameBorder="0" marginHeight="0" marginWidth="0" title="Guest Photo Upload Form">Loading…</iframe>
        </div>
    </section>
);

// RSVP Form Section
const RsvpForm = () => {
    const [formData, setFormData] = useState({ name: '', attending: '', attendingChurch: false, attendingParty: false, song: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const churchCeremony = { title: "Wedding Ceremony of Quyen & Hien", startDate: '20280701T140000', endDate: '20280701T150000', location: 'St. Joseph Cathedral, 212 E Broad St, Columbus, OH 43215', description: "The sacred union of Quyen Mai & Hien Dang." };
    const weddingParty = { title: "Wedding Party for Quyen & Hien", startDate: '20280701T180000', endDate: '20280701T230000', location: 'The Westin Great Southern Columbus, 310 S High St, Columbus, OH 43215', description: "Join us for a night of dinner, dancing, and celebration!" };
    const createGoogleCalendarUrl = (event) => `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    const createIcsUrl = (event) => `data:text/calendar;charset=utf8,${encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:${window.location.href}\nDTSTART:${event.startDate}\nDTEND:${event.endDate}\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nLOCATION:${event.location}\nEND:VEVENT\nEND:VCALENDAR`)}`;
    const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value })); };
    const handleSubmit = (e) => { e.preventDefault(); console.log('RSVP Submission:', formData); setSubmitted(true); };
    const isAttending = formData.attending === 'yes';

    return (
        <section id="rsvp" className="page-section rsvp-section">
            <div className="section-header"><img src={hqStamp1} alt="Quyen & Hien Stamp" className="section-stamp-logo" /><h2>Event Details & RSVP</h2></div>
            <div className="rsvp-details-container">
                <div className="detail-item"><h3>Church Ceremony</h3><p><strong>July 1, 2028 at 2:00 PM</strong></p><p>St. Joseph Cathedral, Columbus, OH</p><div className="button-group"><a href={createGoogleCalendarUrl(churchCeremony)} target="_blank" rel="noopener noreferrer" className="button calendar-btn">Google Calendar</a><a href={createIcsUrl(churchCeremony)} download="wedding-ceremony.ics" className="button calendar-btn">Apple/Outlook</a></div></div>
                <div className="detail-item"><h3>Wedding Party</h3><p><strong>July 1, 2028 at 6:00 PM</strong></p><p>The Westin Great Southern, Columbus, OH</p><div className="button-group"><a href={createGoogleCalendarUrl(weddingParty)} target="_blank" rel="noopener noreferrer" className="button calendar-btn">Google Calendar</a><a href={createIcsUrl(weddingParty)} download="wedding-party.ics" className="button calendar-btn">Apple/Outlook</a></div></div>
            </div>
            <hr className="rsvp-divider" />
            {submitted ? (<div className="thank-you-message"><h3>Thank you!</h3><p>Your response has been recorded. We can't wait to celebrate with you!</p></div>) : (
                <form onSubmit={handleSubmit} className="rsvp-form">
                    <p>Please let us know if you can join our celebration by May 1st, 2028.</p>
                    <div className="form-group"><label htmlFor="name">Full Name(s)</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., John & Jane Doe" required /></div>
                    <div className="form-group"><fieldset><legend>Will you be joining us?</legend><div className="radio-group"><label htmlFor="attending-yes" className={formData.attending === 'yes' ? 'selected' : ''}><input type="radio" id="attending-yes" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={handleChange} required /> Joyfully Accepts</label><label htmlFor="attending-no" className={formData.attending === 'no' ? 'selected' : ''}><input type="radio" id="attending-no" name="attending" value="no" checked={formData.attending === 'no'} onChange={handleChange} /> Regretfully Declines</label></div></fieldset></div>
                    {isAttending && (<div className="form-group fade-in"><fieldset><legend>Which events will you attend?</legend><div className="checkbox-group"><label htmlFor="attending-church" className={formData.attendingChurch ? 'selected' : ''}><input type="checkbox" id="attending-church" name="attendingChurch" checked={formData.attendingChurch} onChange={handleChange} /> Church Ceremony</label><label htmlFor="attending-party" className={formData.attendingParty ? 'selected' : ''}><input type="checkbox" id="attending-party" name="attendingParty" checked={formData.attendingParty} onChange={handleChange} /> Wedding Party</label></div></fieldset></div>)}
                    <div className="form-group"><label htmlFor="song">What song will get you on the dance floor?</label><input type="text" id="song" name="song" value={formData.song} onChange={handleChange} placeholder="Song Title & Artist" /></div>
                    <div className="form-group"><label htmlFor="message">Leave a message for the couple (optional)</label><textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4"></textarea></div>
                    <button type="submit" className="button">Submit RSVP</button>
                </form>
            )}
        </section>
    );
};

// --- Tab Navigation with Scroll-to-Center Logic ---
const TabNavigation = ({ activeView, onViewChange }) => {
  const navRef = useRef(null);
  const [showLeftHint, setShowLeftHint] = useState(false);
  const [showRightHint, setShowRightHint] = useState(false);

  const navItems = [
      { id: VIEWS.JOURNEY, label: 'Our Journey' },
      { id: VIEWS.OUR_CROSS, label: 'Our Cross' },
      { id: VIEWS.SCHEDULE, label: 'Schedule' },
      { id: VIEWS.PHOTOBOOK, label: 'Photobook' },
      { id: VIEWS.RSVP, label: 'RSVP' }
  ];
  
  useEffect(() => {
    const nav = navRef.current;
    if (nav && activeView) {
      const activeButton = nav.querySelector(`[data-view-id="${activeView}"]`);
      if (activeButton) {
        const navWidth = nav.clientWidth;
        const buttonWidth = activeButton.offsetWidth;
        const buttonLeft = activeButton.offsetLeft;
        const scrollTo = buttonLeft - (navWidth / 2) + (buttonWidth / 2);
        nav.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    }
  }, [activeView]);

  const checkForScroll = useCallback(() => {
    const nav = navRef.current;
    if (nav) {
      const isScrollable = nav.scrollWidth > nav.clientWidth;
      setShowLeftHint(isScrollable && nav.scrollLeft > 1);
      setShowRightHint(isScrollable && nav.scrollLeft < nav.scrollWidth - nav.clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      checkForScroll();
      nav.addEventListener('scroll', checkForScroll, { passive: true });
      window.addEventListener('resize', checkForScroll);
      return () => {
        nav.removeEventListener('scroll', checkForScroll);
        window.removeEventListener('resize', checkForScroll);
      };
    }
  }, [checkForScroll]);

  return (
    <div className="tab-navbar-wrapper">
      <div className={`scroll-hint left ${showLeftHint ? 'visible' : ''}`}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div>
      <nav className="tab-navbar" ref={navRef}>
        {navItems.map(item => (
          <button key={item.id} data-view-id={item.id} className={`tab-nav-link ${activeView === item.id ? 'active' : ''}`} onClick={() => onViewChange(item.id)}>{item.label}</button>
        ))}
      </nav>
      <div className={`scroll-hint right ${showRightHint ? 'visible' : ''}`}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
    </div>
  );
};

const ViewDisplay = ({ activeView }) => {
  return (
    <div className="view-container">
      {activeView === VIEWS.JOURNEY && <OurJourney />}
      {activeView === VIEWS.OUR_CROSS && <OurCrossSection />}
      {activeView === VIEWS.SCHEDULE && <WeddingDaySchedule />}
      {activeView === VIEWS.PHOTOBOOK && <GuestPhotobook />}
      {activeView === VIEWS.RSVP && <RsvpForm />}
    </div>
  );
};

// --- Scroll to Top Button ---
const ScrollToTopButton = ({ isVisible }) => {
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <button className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Scroll to top">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
  );
};

// --- Main Page Component ---
function HomePage() {
  const [activeView, setActiveView] = useState(VIEWS.JOURNEY);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setShowScrollButton(window.scrollY > 300); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <div className="homepage-container">
      <WelcomeBanner backgroundImage={heroBgImage} onViewChange={setActiveView} />
      <TabNavigation activeView={activeView} onViewChange={setActiveView} />
      <div className="main-content-area">
        <ViewDisplay activeView={activeView} />
      </div>
      <footer className="footer">
        <img src={hqArt} alt="Quyen & Hien decorative art" className="footer-art" />
        <p>
            <span className="amdg-wrapper">AMDG<span className="amdg-tooltip"><strong>Ad Majorem Dei Gloriam</strong><em>"for the greater glory of God"</em></span></span>
            &nbsp;|&nbsp;Made with love by Quyen & Hien&nbsp;|&nbsp;2028
        </p>
      </footer>
      <ScrollToTopButton isVisible={showScrollButton} />
    </div>
  );
}

export default HomePage;
