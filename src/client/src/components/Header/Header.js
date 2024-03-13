/**
 * @file Header.js
 * @description A component that renders the application header.
 * @author @Tarak1246
 */

/**
 * @module Header
 */
/**
 * @module React
 * @description The React library for building user interfaces.
 */
import React from 'react';
/**
 * @function Header
 * @description Renders the application's header element.
 * @returns {JSX.Element} The JSX representation of the header.
 */
const Header = () => {
  /**
   * @description Defines inline styles for the header component.
   */
  const headerStyles = {
    height: '95px',
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    width: '100%',
  };
  return (
    <div style={headerStyles}>
      <h1 style={{ fontFamily: 'serif', fontSize: '3rem', marginTop: '12px' }}>
        PROJECT TRACKER
      </h1>
    </div>
  );
};

export default Header;
