/**
 * AppContext - Global State Management
 * Manages language, theme, and app-wide state
 * Eliminates prop drilling
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'prop-types';
import PropTypes from 'prop-types';
import { translations } from '../data/translations';

// Create contexts
const AppContext = createContext(null);

/**
 * App Provider Component
 * Wraps the entire app to provide global state
 */
export const AppProvider = ({ children }) => {
  // Language state
  const [language, setLanguage] = useState('en');

  // Theme state (for future dark mode support)
  const [theme, setTheme] = useState('matcha-latte');

  // Active view state
  const [activeView, setActiveView] = useState('journey');

  // RSVP state (for tracking user's RSVP status)
  const [rsvpStatus, setRsvpStatus] = useState({
    submitted: false,
    attending: null,
    events: []
  });

  // Get current translations based on language
  const t = useMemo(() => translations[language], [language]);

  // Toggle language
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'vn' : 'en');
  }, []);

  // Change theme
  const changeTheme = useCallback((newTheme) => {
    setTheme(newTheme);
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', newTheme);
  }, []);

  // Update RSVP status
  const updateRsvpStatus = useCallback((status) => {
    setRsvpStatus(prev => ({ ...prev, ...status }));
  }, []);

  // Context value
  const value = useMemo(() => ({
    // Language
    language,
    setLanguage,
    toggleLanguage,
    t,

    // Theme
    theme,
    changeTheme,

    // View state
    activeView,
    setActiveView,

    // RSVP
    rsvpStatus,
    updateRsvpStatus
  }), [language, toggleLanguage, t, theme, changeTheme, activeView, rsvpStatus, updateRsvpStatus]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Custom hook to use App Context
 * Throws error if used outside AppProvider
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

/**
 * Custom hook for language state only
 */
export const useLanguage = () => {
  const { language, setLanguage, toggleLanguage, t } = useAppContext();
  return { language, setLanguage, toggleLanguage, t };
};

/**
 * Custom hook for theme state only
 */
export const useTheme = () => {
  const { theme, changeTheme } = useAppContext();
  return { theme, changeTheme };
};

/**
 * Custom hook for RSVP state only
 */
export const useRSVP = () => {
  const { rsvpStatus, updateRsvpStatus } = useAppContext();
  return { rsvpStatus, updateRsvpStatus };
};

export default AppContext;
