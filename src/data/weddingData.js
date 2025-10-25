/**
 * Wedding Data Layer
 * Centralized data management - separates content from presentation
 * Easy to integrate with CMS in the future
 */

// Event Details
export const eventDetails = {
  weddingDate: '2028-07-01T00:00:00',
  venue: {
    ceremony: {
      name: 'St. Joseph Cathedral',
      address: '212 E Broad St, Columbus, OH 43215',
      time: '2:00 PM',
      coordinates: { lat: 39.9612, lng: -82.9988 }
    },
    reception: {
      name: 'The Westin Great Southern Columbus',
      address: '310 S High St, Columbus, OH 43215',
      time: '6:00 PM',
      coordinates: { lat: 39.9584, lng: -83.0007 }
    }
  }
};

// Calendar Events
export const calendarEvents = {
  churchCeremony: {
    title: 'Wedding Ceremony of Quyen & Hien',
    startDate: '20280701T140000',
    endDate: '20280701T150000',
    location: 'St. Joseph Cathedral, 212 E Broad St, Columbus, OH 43215',
    description: 'The sacred union of Quyen Mai & Hien Dang.'
  },
  weddingParty: {
    title: 'Wedding Party for Quyen & Hien',
    startDate: '20280701T180000',
    endDate: '20280701T230000',
    location: 'The Westin Great Southern Columbus, 310 S High St, Columbus, OH 43215',
    description: 'Join us for a night of dinner, dancing, and celebration!'
  }
};

// Couple Information
export const coupleInfo = {
  groom: {
    fullName: 'Mai Vương Quyền',
    firstName: 'Quyen',
    birthDate: '1995-09-20',
    role: 'The Eldest Son',
    bio: 'Born on September 20, 1995, Quyen is a creative web and blockchain developer. In his free time, he enjoys coding, tending to his plants, and gaming.',
    moonPhase: 'Waning Crescent',
    interests: ['Coding', 'Gardening', 'Gaming', 'Blockchain']
  },
  bride: {
    fullName: 'Đặng Ngọc Thu Hiền',
    firstName: 'Hien',
    birthDate: '2000-03-15',
    role: 'The Youngest Daughter',
    bio: 'Born on March 15, 2000, Hien is a compassionate nurse. She loves to unwind with music, knitting, and watching movies.',
    moonPhase: 'Waxing Gibbous',
    interests: ['Music', 'Knitting', 'Movies', 'Nursing']
  }
};

// Navigation Views
export const VIEWS = {
  JOURNEY: 'journey',
  LOVE_PAPARAZZI: 'love_paparazzi',
  SCHEDULE: 'schedule',
  PHOTOBOOK: 'photobook',
  WELL_WISHES: 'well_wishes',
  RSVP: 'rsvp'
};

// Biblical Quotes for Welcome Banner
export const blessingQuotes = [
  {
    id: 1,
    text: 'I have found the one whom my soul loves.',
    source: 'Song of Solomon 3:4',
    theme: 'love'
  },
  {
    id: 2,
    text: 'Two are better than one... If either of them falls down, one can help the other up.',
    source: 'Ecclesiastes 4:9-10',
    theme: 'partnership'
  },
  {
    id: 3,
    text: 'Let the morning bring me word of your unfailing love, for I have put my trust in you.',
    source: 'Psalm 143:8',
    theme: 'trust'
  },
  {
    id: 4,
    text: 'I will betroth you to me forever; I will betroth you in righteousness and justice, in love and compassion.',
    source: 'Hosea 2:19',
    theme: 'commitment'
  },
  {
    id: 5,
    text: 'I have loved you with an everlasting love; I have drawn you with unfailing kindness.',
    source: 'Jeremiah 31:3',
    theme: 'devotion'
  },
  {
    id: 6,
    text: 'Love bears all things, believes all things, hopes all things, endures all things.',
    source: '1 Corinthians 13:7',
    theme: 'endurance'
  },
  {
    id: 7,
    text: 'Be completely humble and gentle; be patient, bearing with one another in love.',
    source: 'Ephesians 4:2',
    theme: 'patience'
  },
  {
    id: 8,
    text: 'No one has ever seen God; but if we love one another, God lives in us and his love is made complete in us.',
    source: '1 John 4:12',
    theme: 'faith'
  },
  {
    id: 9,
    text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.',
    source: 'Galatians 5:22-23',
    theme: 'spirit'
  },
  {
    id: 10,
    text: 'Therefore what God has joined together, let no one separate.',
    source: 'Mark 10:9',
    theme: 'unity'
  }
];

// Schedule Timeline
export const scheduleTimeline = [
  {
    id: 'ceremony',
    title: 'Ceremony',
    time: '2:00 PM - 3:00 PM',
    location: 'St. Joseph Cathedral',
    description: 'Join us as we exchange our vows in the presence of God and loved ones.',
    icon: 'church',
    order: 1
  },
  {
    id: 'cocktail',
    title: 'Cocktail Hour',
    time: '4:00 PM - 5:00 PM',
    location: 'Cathedral Gardens',
    description: 'Enjoy refreshments and mingle with other guests during our cocktail hour.',
    icon: 'cocktail',
    order: 2
  },
  {
    id: 'dinner',
    title: 'Dinner & Reception',
    time: '6:00 PM - 9:00 PM',
    location: 'The Westin Great Southern',
    description: 'Celebrate with us over dinner, toasts, and dancing.',
    icon: 'dinner',
    order: 3
  },
  {
    id: 'exit',
    title: 'Grand Exit',
    time: '9:30 PM',
    location: 'Front of The Westin',
    description: 'Send us off in style with a grand sparkler exit.',
    icon: 'car',
    order: 4
  }
];

// Social Media & Contact
export const socialLinks = {
  instagram: null, // Add if available
  facebook: null,  // Add if available
  email: 'quyenhien2028@example.com', // Update with real email
  phone: null      // Add if available
};

// Website Metadata
export const siteMetadata = {
  title: 'Quyen & Hien Wedding',
  description: 'Join us as we celebrate our wedding on July 1, 2028 in Columbus, OH',
  url: 'https://revoloero.github.io/vqm-wedding',
  image: '/assets/og-image.jpg', // Add open graph image
  author: 'Quyen Mai & Hien Dang',
  keywords: ['wedding', 'Columbus', 'Quyen', 'Hien', '2028']
};

// Theme Configuration
export const themeConfig = {
  themes: {
    'matcha-latte': {
      name: 'Matcha Latte',
      colors: {
        background: '#F8F5EE',
        primary: '#2A4036',
        secondary: '#FDFBF5',
        accent: '#f8da7f',
        accentDeep: '#c19614',
        text: '#36454F',
        textLight: '#FFFFFF'
      }
    },
    'luxury-emerald': {
      name: 'Luxury Emerald',
      colors: {
        background: '#F5F1E9',
        primary: '#2A4036',
        secondary: '#F4DA8F',
        accent: '#D4AF37',
        accentDeep: '#B8860B',
        text: '#2A4036',
        textLight: '#FFFFFF'
      }
    }
  },
  defaultTheme: 'matcha-latte'
};

// API Configuration (for future CMS integration)
export const apiConfig = {
  baseUrl: process.env.REACT_APP_API_URL || '',
  endpoints: {
    rsvp: '/api/rsvp',
    guestbook: '/api/guestbook',
    photos: '/api/photos'
  },
  enabled: false // Toggle when CMS is integrated
};

/**
 * Helper function to get event by ID
 */
export const getEventById = (eventId) => {
  return calendarEvents[eventId] || null;
};

/**
 * Helper function to get schedule item by ID
 */
export const getScheduleItem = (itemId) => {
  return scheduleTimeline.find(item => item.id === itemId) || null;
};

/**
 * Helper function to format date
 */
export const formatEventDate = (dateString, locale = 'en-US') => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export default {
  eventDetails,
  calendarEvents,
  coupleInfo,
  VIEWS,
  blessingQuotes,
  scheduleTimeline,
  socialLinks,
  siteMetadata,
  themeConfig,
  apiConfig
};
