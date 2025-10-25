/**
 * Custom Hook for Dynamic Translation Loading
 * Loads language files on-demand for better code splitting
 */

import { useState, useEffect } from 'react';
import { translations as fallbackTranslations } from '../data/translations';

/**
 * Dynamic translation loader hook
 * Loads language files only when needed
 *
 * @param {string} initialLanguage - Initial language ('en' or 'vn')
 * @returns {Object} { t, language, setLanguage, isLoading }
 */
export const useTranslations = (initialLanguage = 'en') => {
  const [language, setLanguage] = useState(initialLanguage);
  const [translations, setTranslations] = useState(fallbackTranslations[initialLanguage]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // For now, use the static import as fallback
    // In future, you can implement dynamic imports like:
    /*
    const loadTranslation = async () => {
      setIsLoading(true);
      try {
        const translationModule = await import(`../data/translations-${language}.js`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Failed to load translation:', error);
        setTranslations(fallbackTranslations[language]);
      } finally {
        setIsLoading(false);
      }
    };
    loadTranslation();
    */

    // Current implementation: use static translations
    setTranslations(fallbackTranslations[language]);
  }, [language]);

  return {
    t: translations,
    language,
    setLanguage,
    isLoading
  };
};

export default useTranslations;
