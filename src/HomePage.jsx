import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/base.css';
import './css/sections.css';
import './css/components.css';
import './css/responsive.css';
import './css/GuestBook.css'; // Import the new CSS file

// --- TRANSLATION DATA ---
import { translations } from './data/translations.js';

// --- ASSET IMPORT ---
import heroBgImage from './assets/bg-2.jpeg';
import journeyImage from './assets/bg-2.jpeg';
import hqStamp1 from './assets/HQ-stamp-1-nobg.png'; // Rectangular Stamp
import hqStamp2 from './assets/HQ-stamp-2-nobg.png'; // Circular Stamp
import hqStamp3 from './assets/HQ-stamp-3-nobg.png'; // New stamp for schedule
import hqArt from './assets/HQ-art.png'; // Footer Art
import hqArt2 from './assets/HQ-art-2.png';


// --- LAZY LOAD COMPONENTS ---
const GuestBook = lazy(() => import('./GuestBook'));

// --- CONSTANTS ---
const VIEWS = {
  JOURNEY: 'journey',
  LOVE_PAPARAZZI: 'love_paparazzi',
  SCHEDULE: 'schedule',
  PHOTOBOOK: 'photobook',
  WELL_WISHES: 'well_wishes',
  RSVP: 'rsvp',
};

// --- Reusable Components ---

// Countdown Timer for the Wedding
const Countdown = ({ targetDate, t }) => {
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

// Main Welcome Banner (Stays at the top)
const WelcomeBanner = ({ backgroundImage, onViewChange, t }) => {
    const quotes = [
        { text: "I have found the one whom my soul loves.", source: "Song of Solomon 3:4" },
        { text: "Two are better than one... If either of them falls down, one can help the other up.", source: "Ecclesiastes 4:9-10" },
        { text: "Let the morning bring me word of your unfailing love, for I have put my trust in you.", source: "Psalm 143:8" },
        { text:  "I will betroth you to me forever; I will betroth you in righteousness and justice, in love and compassion."
, source: "Hosea 2:19" },
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
        }, 7000);
        return () => clearInterval(intervalId);
    }, [quotes.length]);

    const currentQuote = quotes[currentIndex];

    const bgStyle = { backgroundImage: `url(${backgroundImage})` };

    const handleCrossClick = () => {
        onViewChange(VIEWS.LOVE_PAPARAZZI);
        setTimeout(() => {
            const element = document.getElementById('love_paparazzi');
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
                  <circle className="accent-circle" cx="50" cy="35" r="4"/>
                  <path d="M50 40 C 40 55, 60 55, 50 70 C 40 85, 60 85, 50 90" strokeWidth="2.5"/>
                  <path d="M50 40 C 60 55, 40 55, 50 70 C 60 85, 40 85, 50 90" strokeWidth="2.5"/>
                  <path d="M50 40 V 90" strokeWidth="2.5"/>
                  <circle className="accent-circle" cx="50" cy="94" r="4"/>
              </svg>
            </div>
          </button>
          <h1 className="welcome-banner-names">{t.welcomeBanner.names}</h1>
          <p className="welcome-banner-details">{t.welcomeBanner.details}</p>
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
const OurJourney = ({ onNavigate, t }) => (
    <section id="journey" className="page-section journey-section">
        <div className="section-content-journey">
            <div className="journey-image-container" style={{ backgroundImage: `url(${journeyImage})` }}>
                {/* This is the background image next to the book */}
            </div>
            <div className="journey-book-container">
                <a href="/our-full-story" onClick={onNavigate} className="journey-book-link">
                    <div className="journey-book">
                        <div className="journey-book-pages">
                            <div className="page-edge"></div><div className="page-edge"></div><div className="page-edge"></div>
                        </div>
                        <div className="journey-book-cover">
                            <div className="journey-stamp-wrapper" style={{ WebkitMaskImage: `url(${hqStamp2})`, maskImage: `url(${hqStamp2})` }} />
                            <h2 className="journey-book-title">{t.journey.title}</h2>
                            <p className="journey-book-subtitle">{t.journey.subtitle}</p>
                            <div className="journey-book-prompt"><span>{t.journey.prompt}</span></div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </section>
);

// --- REVISED: Meet the Couple Section with Flip Interaction ---
const MeetTheCouple = ({ t }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Helper to format the name with line breaks for desktop
    const formatName = (name) => {
        return name.split(' ').join('<br/>');
    };

    // Function to handle click, only flips on mobile
    const handleCardClick = () => {
        if (window.innerWidth <= 768) {
            setIsFlipped(!isFlipped);
        }
    };

    return (
        <section className="page-section meet-the-couple-section">
            <div className="invitation-card-container" onClick={handleCardClick}>
                <div className={`invitation-card ${isFlipped ? 'is-flipped' : ''}`}>
                    {/* Front of the card */}
                    <div className="invitation-card-face invitation-card-front">
                        {/* Desktop-only view */}
                        <div className="invitation-column desktop-only">
                            <div className="person-title">{t.meetTheCouple.groomTitle}</div>
                            <h3 className="person-name" dangerouslySetInnerHTML={{ __html: formatName(t.meetTheCouple.groomName) }}></h3>
                            <p className="person-bio">{t.meetTheCouple.groomBio}</p>
                        </div>
                        <div className="invitation-center-divider desktop-only">
                            <img src={hqArt2} alt="Quyen & Hien Stamp" className="invitation-stamp" />
                        </div>
                        <div className="invitation-column desktop-only">
                            <div className="person-title">{t.meetTheCouple.brideTitle}</div>
                            <h3 className="person-name" dangerouslySetInnerHTML={{ __html: formatName(t.meetTheCouple.brideName) }}></h3>
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
                                <img src={hqArt2} alt="Quyen & Hien Stamp" className="invitation-stamp" />
                            </div>
                            <div className="mobile-tap-prompt">
                                <span>The Couple's Bio &gt;</span>
                            </div>
                        </div>
                    </div>

                    {/* Back of the card (Mobile only) */}
                    <div className="invitation-card-face invitation-card-back">
                        <h2 className="mobile-bio-header">Our Story</h2>
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
        </section>
    );
};


// --- REVISED: Love Paparazzi Section as a Newspaper Article ---
const LovePaparazziSection = ({ t }) => {
    // State to manage the active animation class for the moon visualization
    const [isMoonAnimated, setIsMoonAnimated] = useState(false);

    // Function to toggle the animation class
    const toggleMoonAnimation = () => {
        setIsMoonAnimated(prev => !prev);
    };

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

                <div id="article-cord" className="cross-newspaper-article">
                    <h2 className="article-headline">{t.lovePaparazzi.cordHeadline}</h2>
                    <div className="article-content">
                        <div className="article-column-visual">
                            <div className="explanation-visual">
                                <svg className="explanation-svg"  viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <g className="explanation-glow-group"><path d="M50 12 V30 M27 35 H45 M73 35 H55" strokeWidth="3"/><path d="M50 40 C 40 55, 60 55, 50 70 C 40 85, 60 85, 50 90" strokeWidth="2.5"/><path d="M50 40 C 60 55, 40 55, 50 70 C 60 85, 40 85, 50 90" strokeWidth="2.5"/><path d="M50 40 V 90" strokeWidth="2.5"/></g>
                                    <circle className="accent-circle" cx="50" cy="8" r="4"/><circle className="accent-circle" cx="23" cy="35" r="4"/><circle className="accent-circle" cx="77" cy="35" r="4"/><circle className="accent-circle" cx="50" cy="35" r="5"/><circle className="accent-circle" cx="50" cy="94" r="4"/>
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

                {/* Stamp between the two articles */}
                <div className="love-paparazzi-stamp-container">
                    <div className="love-paparazzi-stamp" style={{ maskImage: `url(${hqStamp1})`, WebkitMaskImage: `url(${hqStamp1})` }}></div>
                </div>

                {/* REVISED Moon Phase Article */}
                <div id="article-moon" className="moon-phase-article">
                    <h2 className="article-headline">A Celestial Sync: Written in the Stars ✨</h2>
                    <div className={`moon-visualization-container ${isMoonAnimated ? 'active-moon-animation' : ''}`} onClick={toggleMoonAnimation}>
                        <div className="moon-wrapper">
                            <div className="moon-icon waning-crescent"></div>
                            <p className="moon-label">Quyen's Moon</p>
                            <p className="moon-phase-name">Waning Crescent</p>
                        </div>
                        <div className="moon-wrapper">
                            <div className="moon-icon waxing-gibbous"></div>
                            <p className="moon-label">Hien's Moon</p>
                            <p className="moon-phase-name">Waxing Gibbous</p>
                        </div>
                        <div className="moon-combined-label">
                            <p className="moon-combined-main">Our Moon</p>
                            <p className="moon-combined-sub">Full Moon</p>
                        </div>
                    </div>
                    <div className="moon-explanation-text">
                        <p className="moon-intro-paragraph">
                            Did you know the moon phase on your birthday is considered your <b>"birth moon"</b>? It's said to offer insights into your personality and spiritual journey!
                        </p>

                        <div className="moon-person-fact">
                            <p className="person-name">Quyen Mai<span className="birth-date">(September 20, 1995)</span></p>
                            <p className="moon-phase-detail"><i>Born under a <b>Waning Crescent</b></i> 🌙</p>
                            <p className="moon-description">This phase often signifies a time of <b>quiet reflection, wisdom, and a desire to share knowledge</b>. It suggests a journey of completion and preparing for new beginnings with a gentle, introspective spirit.</p>
                        </div>

                        <div className="moon-person-fact">
                            <p className="person-name">Hien Dang<span className="birth-date">(March 15, 2000)</span></p>
                            <p className="moon-phase-detail"><i>Born under a <b>Waxing Gibbous</b></i> 🌔</p>
                            <p className="moon-description">This moon phase represents nurturing things toward <b>fulfillment, growth, and refinement.</b> Individuals born under this moon are often dedicated, analytical, and strive for perfection in their endeavors.</p>
                        </div>

                        <p className="moon-summary">
                            How incredible that as one moon (Waning Crescent) embraces reflection and prepares for rest, the other (Waxing Gibbous) diligently grows towards its fullest potential! When combined, your individual moon energies beautifully align to form a <b>Full Moon</b> 🌕—a symbol of <b>completion, illumination, and profound unity</b>. It's a celestial reminder that together, your spirits create a harmonious, radiant, and complete cycle of love.
                        </p>
                    </div>
                </div>

                {/* Stamp between the articles */}
                <div className="love-paparazzi-stamp-container">
                    <div className="love-paparazzi-stamp" style={{ maskImage: `url(${hqStamp2})`, WebkitMaskImage: `url(${hqStamp2})`, width: "120px", height: "120px", transform: 'translate(-50%, -50%) rotate(5deg)' }}></div>
                </div>

                {/* NEW: Ring Article */}
                <div id="article-ring" className="cross-newspaper-article">
                    <h2 className="article-headline">{t.lovePaparazzi.ringHeadline}</h2>
                    <div className="article-content ring-article-layout">
                        <div className="article-column-visual">
                            <div className="ring-image-placeholder">
                                <img 
                                    src="https://placehold.co/400x500/e0dccc/36454F?text=Our+Ring" 
                                    alt="Our engagement ring" 
                                    className="ring-image"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x500/cccccc/ffffff?text=Image+Coming+Soon'; }}
                                />
                            </div>
                            <p className="explanation-scripture" style={{textAlign: 'center', background: 'transparent', padding: '1rem 0'}}><em>{t.lovePaparazzi.ringScripture}</em></p>
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
                                <p>{t.lovePaparazzi.ringLink} <a href="https://www.doamore.com/impact" target="_blank" rel="noopener noreferrer">Do Amore website</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


// Reworked Wedding Day Schedule Section with Timeline and new Icons
const WeddingDaySchedule = ({ t }) => (
    <section id="schedule" className="page-section schedule-section">
        <div className="section-header">
            <div className="section-stamp-logo" style={{ maskImage: `url(${hqStamp3})`, WebkitMaskImage: `url(${hqStamp3})` }}></div>
            <h2>{t.schedule.title}</h2>
        </div>
        <div className="schedule-timeline-container">
            <div className="schedule-item"><div className="schedule-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M8 9H4v10h4V9zm8 0h4v10h-4V9z"/><path d="M4 9V5l8-3 8 3v4"/></svg></div><div className="schedule-content"><h3>{t.schedule.ceremony}</h3><p className="schedule-time">{t.schedule.ceremonyTime}</p><p>{t.schedule.ceremonyDesc}</p><p className="schedule-location">{t.schedule.ceremonyLocation}</p></div></div>
            <div className="schedule-item"><div className="schedule-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></svg></div><div className="schedule-content"><h3>{t.schedule.cocktail}</h3><p className="schedule-time">{t.schedule.cocktailTime}</p><p>{t.schedule.cocktailDesc}</p><p className="schedule-location">{t.schedule.cocktailLocation}</p></div></div>
            <div className="schedule-item"><div className="schedule-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div><div className="schedule-content"><h3>{t.schedule.dinner}</h3><p className="schedule-time">{t.schedule.dinnerTime}</p><p>{t.schedule.dinnerDesc}</p><p className="schedule-location">{t.schedule.dinnerLocation}</p></div></div>
            <div className="schedule-item"><div className="schedule-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v9c0 .6.4 1 1 1h3"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></div><div className="schedule-content"><h3>{t.schedule.exit}</h3><p className="schedule-time">{t.schedule.exitTime}</p><p>{t.schedule.exitDesc}</p><p className="schedule-location">{t.schedule.exitLocation}</p></div></div>
        </div>
    </section>
);

// --- Guest Photobook Section ---
const GuestPhotobook = () => (
    <section id="photobook" className="page-section photobook-section">
        <div className="section-header">
            <div className="section-stamp-logo" style={{ maskImage: `url(${hqStamp1})`, WebkitMaskImage: `url(${hqStamp1})` }}></div>
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
const RsvpForm = ({ churchCeremony, weddingParty }) => {
    const [formData, setFormData] = useState({ name: '', attending: '', attendingChurch: false, attendingParty: false, song: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    
    const createGoogleCalendarUrl = (event) => `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    const createIcsUrl = (event) => `data:text/calendar;charset=utf8,${encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:${window.location.href}\nDTSTART:${event.startDate}\nDTEND:${event.endDate}\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nLOCATION:${event.location}\nEND:VEVENT\nEND:VCALENDAR`)}`;
    const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value })); };
    const handleSubmit = (e) => { e.preventDefault(); console.log('RSVP Submission:', formData); setSubmitted(true); };
    const isAttending = formData.attending === 'yes';

    return (
        <section id="rsvp" className="page-section rsvp-section">
            <div className="section-header">
                <div className="section-stamp-logo" style={{ maskImage: `url(${hqStamp1})`, WebkitMaskImage: `url(${hqStamp1})` }}></div>
                <h2>Event Details & RSVP</h2>
            </div>
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

// --- REVISED: Utility Bar Component ---
const UtilityBar = ({ language, setLanguage }) => {
    const handleToggle = () => {
        setLanguage(prev => prev === 'en' ? 'vn' : 'en');
    };

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
                <div
                    className={`lang-slider ${language === 'vn' ? 'vn-active' : ''}`}
                ></div>
                <span
                    className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                >
                    EN
                </span>
                <span
                    className={`lang-btn ${language === 'vn' ? 'active' : ''}`}
                >
                    VN
                </span>
            </div>
        </div>
    );
};


// --- Tab Navigation with Scroll-to-Center Logic ---
const TabNavigation = ({ activeView, onViewChange, t }) => {
  const navRef = useRef(null);
  const [showLeftHint, setShowLeftHint] = useState(false);
  const [showRightHint, setShowRightHint] = useState(false);

  const navItems = [
      { id: VIEWS.JOURNEY, label: t.nav.journey },
      { id: VIEWS.LOVE_PAPARAZZI, label: t.nav.lovePaparazzi },
      { id: VIEWS.SCHEDULE, label: t.nav.schedule },
      { id: VIEWS.PHOTOBOOK, label: t.nav.photobook },
      { id: VIEWS.WELL_WISHES, label: t.nav.wellWishes },
      { id: VIEWS.RSVP, label: t.nav.rsvp }
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

const ViewDisplay = ({ activeView, onStoryClick, events, t }) => {
  return (
    <div className="view-container">
      {activeView === VIEWS.JOURNEY && (
        <>
          <MeetTheCouple t={t} />
          <OurJourney onNavigate={onStoryClick} t={t} />
        </>
      )}
      {activeView === VIEWS.LOVE_PAPARAZZI && <LovePaparazziSection t={t} />}
      {activeView === VIEWS.SCHEDULE && <WeddingDaySchedule t={t} />}
      {activeView === VIEWS.PHOTOBOOK && <GuestPhotobook t={t} />}
      {activeView === VIEWS.WELL_WISHES && <GuestBook t={t} />}
      {activeView === VIEWS.RSVP && <RsvpForm {...events} t={t} />}
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
  const [showAmdgTooltip, setShowAmdgTooltip] = useState(false);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const t = translations[language];

  // Define event details here to be passed as props
  const eventDetails = {
    churchCeremony: { title: "Wedding Ceremony of Quyen & Hien", startDate: '20280701T140000', endDate: '20280701T150000', location: 'St. Joseph Cathedral, 212 E Broad St, Columbus, OH 43215', description: "The sacred union of Quyen Mai & Hien Dang." },
    weddingParty: { title: "Wedding Party for Quyen & Hien", startDate: '20280701T180000', endDate: '20280701T230000', location: 'The Westin Great Southern Columbus, 310 S High St, Columbus, OH 43215', description: "Join us for a night of dinner, dancing, and celebration!" }
  };

  const handleStoryClick = (e) => {
    e.preventDefault();
    setIsZoomingOut(true);
    setTimeout(() => {
        navigate('/vqm-wedding/hq-storybook');
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => { setShowScrollButton(window.scrollY > 300); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  const toggleAmdgTooltip = () => {
    setShowAmdgTooltip(prev => !prev);
  };

  return (
    <div className={`homepage-container ${isZoomingOut ? 'is-zooming-out' : ''}`}>
      <WelcomeBanner backgroundImage={heroBgImage} onViewChange={setActiveView} t={t} />
      <UtilityBar language={language} setLanguage={setLanguage} />
      <TabNavigation activeView={activeView} onViewChange={setActiveView} t={t} />
      <div className="main-content-area">
        <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <ViewDisplay 
                activeView={activeView} 
                onStoryClick={handleStoryClick}
                events={eventDetails}
                t={t}
            />
        </Suspense>
      </div>
      <footer className="footer">
        <img src={hqArt} alt="Quyen & Hien decorative art" className="footer-art" />
        <p>
            <button 
                className={`amdg-wrapper ${showAmdgTooltip ? 'active' : ''}`} 
                onClick={toggleAmdgTooltip}
                aria-describedby="amdg-tooltip"
            >
                AMDG
                <span className="amdg-tooltip" id="amdg-tooltip" role="tooltip">
                    <strong>Ad Majorem Dei Gloriam</strong>
                    <em>"for the greater glory of God"</em>
                </span>
            </button>
            &nbsp;|&nbsp;Made with love by Quyen & Hien&nbsp;|&nbsp;2028
        </p>
      </footer>
      <ScrollToTopButton isVisible={showScrollButton} />
    </div>
  );
}

export default HomePage;
