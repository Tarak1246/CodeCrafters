/**
 * @file index.js
 * @description Entry point for the React application.
 * Imports necessary libraries, renders the root App component, and integrates performance reporting.
 * @author @Tarak1246
 */
/**
 * @module react
 * @description Core library for building user interfaces with React.
 */
import React from 'react';
/**
 * @module react-dom/client
 * @description Provides methods for interacting with the DOM using React (updated for v18).
 */
import ReactDOM from 'react-dom/client'; // Updated import for ReactDOM v18
/**
 * @description Imports CSS styles from the 'index.css' file.
 */
import './index.css';
/**
 * @description Imports the root App component from the 'App.js' file.
 */
import App from './App';
/**
 * @description Imports the 'reportWebVitals' function for reporting web vitals (performance metrics).
 */
import reportWebVitals from './reportWebVitals';

/**
 * @description Creates a root element for the React application within the DOM.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * @description Renders the App component as the root element of the application.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * @description Reports web vitals (performance metrics) to the browser console.
 * (Optional: Configure reporting to a third-party service.)
 */
reportWebVitals();