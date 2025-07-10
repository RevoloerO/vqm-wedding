import React from 'react';
import './HQLogo.css';

// This is the original CSS-based logo component.
// It is now self-contained in its own file.
const HQLogo = () => (
  <div className="wedding-logo">
    <div className="logo-left-column">
      <span className="logo-text-quy">QUY</span>
      <div className="logo-text-hi-wrapper">
        <span className="logo-text-ampersand">&</span>
        <span className="logo-text-hi">HI</span>
      </div>
    </div>
    <div className="logo-right-column">
      <span className="logo-text-en">EN</span>
    </div>
  </div>
);

export default HQLogo;
