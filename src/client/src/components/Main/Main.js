/**
 * @file Main.js
 * @description Renders the main content area of the application based on the selected tab.
 * @author @Tarak1246
 */

/**
 * @module Main
 */

/**
 * @module React
 * @description The React library for building user interfaces.
 */
import React, { useEffect } from "react";
/**
 * @description Imports the styles defined in main.css.
 */
import "./Main.css"; // Import styles for the Main component
/**
 * @description Import Dashboard component
 */
import Dashboard from "../Dashboard/Dashboard";
/**
 * @description Import Settings component
 */
import Settings from "../Settings/Settings";
/**
 * @description Import Projects component
 */
import Projects from "../Projects/Projects";
/**
 * @description Import Employees component
 */
import Employees from "../Employees/Employees";
/**
 * @description Import Users component
 */
import Users from "../Users/Users";
/**
 * @function Main
 * @param {string} selectedTab - The currently selected tab from the parent component.
 * @returns {JSX.Element} The JSX representation of the main content area.
 */
const Main = ({ selectedTab }) => {
  let content;
  /**
   * @description An empty useEffect hook to ensure the component runs its logic only on mount.
   */
  useEffect(() => {
    // Call the function on component mount
  }, []); // The empty dependency array ensures it runs only once on mount
  /**
   * @description Renders the appropriate content based on the selected tab.
   * @param {string} selectedTab - The currently selected tab from the parent component.
   */
  switch (selectedTab) {
    case "dashboard":
      content = (
        <div className="my-component-container">
          <Dashboard />
        </div>
      );
      break;
    case "projects":
      content = (
        <div className="my-component-container">
          <Projects />
        </div>
      );
      break;
    case "contracts":
      content = (
        <div className="my-component-container">This is {selectedTab} </div>
      );
      break;
    case "employees":
      content = (
        <div className="my-component-container">
          <Employees />
        </div>
      );
      break;
    case "settings":
      content = (
        <div className="my-component-container">
          <Settings />
        </div>
      );
      break;
    case "users":
      content = (
        <div className="my-component-container">
          <Users />
        </div>
      );
      break;
  }
  /**
   * @description Renders the content of clickable tabs present in side bar menu.
   * @returns {JSX.Element} The JSX representation of the content to be rendered.
   */
  return (
    <main style={{ paddingLeft: "203px", flex: "1", backgroundColor: "#fff" }}>
      {content}
    </main>
  );
};

export default Main;