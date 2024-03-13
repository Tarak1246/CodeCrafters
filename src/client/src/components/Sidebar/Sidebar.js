/**
 * @file Sidebar.js
 * @description Renders the application sidebar with navigation tabs.
 * @author @Tarak1246
 */

/**
 * @module Sidebar
 * @description A component that renders the sidebar for navigation.
 */
/**
 * @module React
 * @description The React library for building user interfaces.
 */
import React, { useState, useEffect } from "react";
/**
 * @description Imports the styles defined in Sidebar.css.
 */
import "./Sidebar.css";
/**
 * @module react-router-dom
 * @description Provides components for client-side routing in React applications.
 */
import { useNavigate } from "react-router-dom";
/**
 * @function Sidebar
 * @param {function} onTabClick - A function to handle tab click events from a parent component.
 * @returns {JSX.Element} The JSX representation of the sidebar.
 */
const Sidebar = ({ onTabClick }) => {
  /**
   * @description Manages the currently active tab using the useState hook.
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [activeTab, setActiveTab] = useState("dashboard");
  /**
   * @description A hook for navigation between routes.
   * @type {any}
   */
  const navigate = useNavigate();
  /**
   * @function handleTabChange
   * @description Handles internal tab click events.
   * @param {string} newTab - The name of the tab that was clicked.
   */
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    onTabClick(newTab);
    navigate(`/home/${newTab}`);
  };
  /**
   * @description Sets up a global event listener for tab clicks and manages cleanup.
   * @param {React.EffectCallback} handleGlobalTabClick - A function to handle global tab clicks.
   */
  useEffect(() => {
    /**
     * @function handleGlobalTabClick
     * @description Handles global tab click events and calls handleTabChange if appropriate.
     * @param {Event} event - The click event.
     */
    window.addEventListener("click", (event) => {
      const clickedTab = event.target.closest(".sidebar-tab");
      if (clickedTab && clickedTab.dataset.tab) {
        const newTab = clickedTab.dataset.tab;
        if (
          newTab !== activeTab &&
          (newTab !== "users" ||
            localStorage.getItem("loginUserType") === "admin" ||
            localStorage.getItem("adminPrivilege") === "true")
        ) {
          handleTabChange(newTab);
        }
      }
    });
    /**
     * @description Remove event listener on component unmount
     */
    return () => window.removeEventListener("click", handleTabChange);
  }, [activeTab, onTabClick, navigate]); // Dependency array for useEffect
  /**
   * @description Renders the sidebar navigation menu with clickable tabs.
   * @returns {JSX.Element} The JSX representation of the sidebar.
   */
  return (
    <nav id="sidebarMenu" class=" d-lg-block sidebar  bg-white">
      <aside
        className="d-lg-block sidebar bg-white"
        style={{
          position: "fixed",
          overflowY: "hidden",
          top: "95px",
          bottom: 0,
        }}
      >
        <div
          data-tab="dashboard"
          className={`sidebar-tab ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => handleTabChange("dashboard")}
        >
          Dashboard
        </div>
        <div
          data-tab="contracts"
          className={`sidebar-tab ${activeTab === "contracts" ? "active" : ""}`}
          onClick={() => handleTabChange("contracts")}
        >
          Contracts
        </div>
        <div
          data-tab="projects"
          className={`sidebar-tab ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => handleTabChange("projects")}
        >
          Projects
        </div>
        <div
          data-tab="employees"
          className={`sidebar-tab ${activeTab === "employees" ? "active" : ""}`}
          onClick={() => handleTabChange("employees")}
        >
          Employees
        </div>
        {(localStorage.getItem("loginUserType") === "admin" ||
          localStorage.getItem("adminPrivilege") === "true") && (
          <div
            data-tab="users"
            className={`sidebar-tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => handleTabChange("users")}
          >
            Users
          </div>
        )}
        <div
          data-tab="settings"
          className={`sidebar-tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => handleTabChange("settings")}
        >
          Settings
        </div>
      </aside>
    </nav>
  );
};

export default Sidebar;