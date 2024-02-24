// Sidebar.js
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  return (
    <aside style={{position:'fixed',overflowY:'hidden',top:'52px',bottom:0}}>
      <div style={{float:'left'}} onClick={() => {onTabClick('dashboard');navigate("/home/dashboard");}}>
        Dashboard
      </div>
      <div style={{float:'left'}} onClick={() => {onTabClick('contracts');navigate("/home/contracts");}}>
        Contracts
      </div>
      <div style={{float:'left'}} onClick={() => {onTabClick('projects');navigate("/home/projects");}}>
        Projects
      </div>
      <div style={{float:'left'}} onClick={() => {onTabClick('employees');navigate("/home/employees");}}>
        Employees
      </div>
      <div style={{float:'left'}} onClick={() => {onTabClick('settings');navigate("/home/settings");}}>
        Settings
      </div>
    </aside>
  );
};

export default Sidebar;