/**
 * @file Layout.js
 * @description A component that provides the overall layout structure for the application.
 * @author @Tarak1246
 */

/**
 * @module Layout
 */

/**
 * @module React
 * @description The React library for building user interfaces.
 */
import React, { useState } from "react";
/**
 * @description Imports the Header component from a subdirectory.
 */
import Header from "../Header/Header";
/**
 * @description Imports the Sidebar component from a subdirectory.
 */
import Sidebar from "../Sidebar/Sidebar";
/**
 * @description Imports the Footer component from a subdirectory.
 */
import Footer from "../Footer/Footer";
/**
 * @description Imports the styles defined in Layout.css.
 */
import "./Layout.css";
/**
 * @description Imports the Main component from a subdirectory.
 */
import Main from "../Main/Main";
/**
 * @typedef SelectedTab
 * @type {'dashboard' | 'otherTab' | ... }
 * @description Represents the currently selected tab in the application.
 */

/**
 * @function Layout
 * @description A component that renders the application's main layout.
 * @param {React.ReactNode} children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The layout structure.
 */
const Layout = ({ children }) => {
  /**
   * @description Manages the currently selected tab using the useState hook.
   * @type {[SelectedTab, React.Dispatch<React.SetStateAction<SelectedTab>>]}
   */
  const [selectedTab, setSelectedTab] = useState("dashboard");
  /**
   * @function handleTabClick
   * @description Handles tab click events, updating the selectedTab state.
   * @param {SelectedTab} tab - The tab that was clicked.
   */
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  /**
   * @description Renders the application's layout structure, including header, sidebar, main content, and footer.
   * @returns {JSX.Element} The JSX representation of the layout.
   */
  return (
    <div className="app-container">
      <Header /> {/* Renders the Header component */}
      <div className="main-container">
        <Sidebar onTabClick={handleTabClick} />{" "}
        {/* Renders the Sidebar component, passing the handleTabClick function as a prop */}
        <Main selectedTab={selectedTab} />{" "}
        {/* Renders the Main component, passing the selectedTab state as a prop */}
        {children} {/* Renders any child components passed through props */}
      </div>
      <Footer /> {/* Renders the Footer component */}
    </div>
  );
};

export default Layout;