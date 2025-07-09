import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// --- Reusable Components ---

// Themed Logo
const HQLogo = () => (
  <div className="wedding-logo">
    <div className='wedding-logo-box'>
      <div className="logo-text" id='logo-text-1'>QUY</div>
      <div className="logo-text" id='logo-text-2'>& HI</div>
    </div>
    <div className="logo-text" id='logo-text-3'>EN</div>
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

// Count-up Timer for Days Together
const Countup = ({ startDate }) => {
    const calculateTimeSince = () => {
        const difference = +new Date() - +new Date(startDate);
        return Math.floor(difference / (1000 * 60 * 60 * 24));
    };

    const [days, setDays] = useState(calculateTimeSince());

    useEffect(() => {
        const timer = setInterval(() => setDays(calculateTimeSince()), 1000 * 60 * 60 * 24);
        return () => clearInterval(timer);
    });

    return (
        <div className="countup">
            <div className="countup-value">{days}</div>
            <div className="countup-unit">Days Together</div>
        </div>
    );
};

// --- Page Sections (Views) ---

// Main Hero Section (Stays at the top)
const Hero = () => (
  <header className="hero-section">
    <div className="hero-background-blur"></div>
    <div className="hero-background-clear"></div>
    <div className="hero-content">
      <h1 className="hero-names">Quyen Mai & Hien Dang</h1>
      <HQLogo />
      <h2 className="hero-date">Are getting married on July 4, 2028</h2>
      <Countdown targetDate="2028-07-04T00:00:00" />
    </div>
  </header>
);

// Our Journey Section
const OurJourney = () => (
    <section id="journey" className="page-section journey-section">
        <div className="section-content-journey">
            <div className="journey-image-container">
                {/* This div is now styled with the background image via CSS */}
            </div>
            <div className="journey-text-container">
                <h2>Our Journey</h2>
                <p>Our journey together began with a shared love for matcha lattes and quiet afternoons. It has since blossomed into a life filled with laughter, adventure, and countless beautiful memories. We are so excited to start this next chapter and couldn't have done it without the love and support from all of you...</p>
                <a href="/our-journey" className="button">Read Our Full Journey</a>
            </div>
        </div>
    </section>
);

// A Blessing Section - Now a Slideshow
const BlessingSlideshow = () => {
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
        <section id="blessing" className="page-section blessing-section">
            <div className="section-content-col">
                <p className="blessing-text fade-in-out">"{currentQuote.text}"</p>
                <p className="blessing-source fade-in-out">{currentQuote.source}</p>
            </div>
        </section>
    );
};

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


// Save the Day Section
const SaveTheDay = () => (
    <section id="save-the-day" className="page-section save-the-day-section">
        <h2>Save the Day</h2>
        <div className="details-container">
            <div className="detail-item">
                <h3>Ceremony & Reception</h3>
                <p>We are still dreaming up the perfect place to say "I do." Here are a few of our inspirations:</p>
                <ul>
                    <li>The Grand Conservatory, Seoul</li>
                    <li>Starlight Rooftop Ballroom, Daegu</li>
                    <li>The Secret Garden Chapel, Jeju Island</li>
                </ul>
            </div>
            <div className="detail-item">
                <h3>Our Journey</h3>
                <Countup startDate="2020-08-15T00:00:00" />
            </div>
        </div>
    </section>
);

// Guest Photos Section
const GuestPhotos = () => (
    <section id="photos" className="page-section photos-section">
        <h2>Share The Memories</h2>
        <div className="section-text-center">
            <p>Help us capture our special day! Upload your photos from the event and view the collective gallery through the links below.</p>
            <div className="button-group">
                <a href="#/upload" className="button">Upload Your Photos</a>
                <a href="#/gallery" className="button">View Guest Gallery</a>
            </div>
        </div>
    </section>
);

// --- New Tab Navigation and View Container ---

const TabNavigation = ({ activeView, onViewChange }) => {
  const navItems = [
      { id: 'journey', label: 'Our Journey' },
      { id: 'save-the-day', label: 'Save the Day' },
      { id: 'fun-facts', label: 'Fun Facts' },
      { id: 'photos', label: 'Photos' }
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
      {activeView === 'save-the-day' && <SaveTheDay />}
      {activeView === 'fun-facts' && <CelestialSync />}
      {activeView === 'photos' && <GuestPhotos />}
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
  const [isSticky, setSticky] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const navWrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navWrapperRef.current) {
        if (window.scrollY > navWrapperRef.current.offsetTop) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      }
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
      <BlessingSlideshow />
      {isSticky && <div style={{ height: navWrapperRef.current?.offsetHeight }} />}
      <div 
        ref={navWrapperRef} 
        className={`tab-navbar-wrapper ${isSticky ? 'sticky' : ''}`}
      >
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
