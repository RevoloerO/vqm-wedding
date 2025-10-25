import React, { useState, useEffect } from 'react';
import './ProgressiveImage.css';

/**
 * ProgressiveImage component with blur-up technique
 * Loads a low-quality placeholder first, then transitions to high-quality image
 *
 * @param {string} src - Main image source (high quality)
 * @param {string} placeholder - Tiny placeholder image (base64 or low-res)
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - Additional CSS classes
 * @param {boolean} lazy - Enable lazy loading (default: true)
 */
const ProgressiveImage = ({
  src,
  placeholder = '',
  alt = '',
  className = '',
  lazy = true,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || src);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // If no placeholder, just load the main image
    if (!placeholder) {
      setImageLoaded(true);
      return;
    }

    // Preload the full image
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };

    img.onerror = () => {
      // Fallback to original src if loading fails
      setImageSrc(src);
      setImageLoaded(true);
    };
  }, [src, placeholder]);

  return (
    <div className={`progressive-image-wrapper ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className={`progressive-image ${imageLoaded ? 'loaded' : 'loading'}`}
        loading={lazy ? 'lazy' : 'eager'}
        {...props}
      />
    </div>
  );
};

export default ProgressiveImage;
