import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
    // Define handleTabChange function here
  const handleTabChange = (newTab) => {
    // Function implementation
  };
  useEffect(() => {
    const handleTabChange = (newTab) => {
      setActiveTab(newTab);
      onTabClick(newTab);
      navigate(`/home/${newTab}`);
    };

    // Attach event listener for tab clicks
    window.addEventListener('click', (event) => {
      const clickedTab = event.target.closest('.sidebar-tab');
      if (clickedTab && clickedTab.dataset.tab) {
        const newTab = clickedTab.dataset.tab;
        if (newTab !== activeTab && (newTab !== 'users' || localStorage.getItem('loginUserType') === 'admin' || localStorage.getItem('adminPrivilege') === 'true')) {
          handleTabChange(newTab);
        }
      }
    });

    // Remove event listener on component unmount
    return () => window.removeEventListener('click', handleTabChange);
  }, [activeTab, onTabClick, navigate]);

  return (
    <aside style={{ position: 'fixed', overflowY: 'hidden', top: '52px', bottom: 0 }}>
      <div data-tab="dashboard" className={`sidebar-tab ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleTabChange('dashboard')}>
        Dashboard
      </div>
      <div data-tab="contracts" className={`sidebar-tab ${activeTab === 'contracts' ? 'active' : ''}`} onClick={() => handleTabChange('contracts')}>
        Contracts
      </div>
      <div data-tab="projects" className={`sidebar-tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => handleTabChange('projects')}>
        Projects
      </div>
      <div data-tab="employees" className={`sidebar-tab ${activeTab === 'employees' ? 'active' : ''}`} onClick={() => handleTabChange('employees')}>
        Employees
      </div>
      {(localStorage.getItem('loginUserType') === 'admin' || localStorage.getItem('adminPrivilege') === 'true')&& (
        <div data-tab="users" className={`sidebar-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => handleTabChange('users')}>
          Users
        </div>
      )}
      <div data-tab="settings" className={`sidebar-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => handleTabChange('settings')}>
        Settings
      </div>
    </aside>
  );
};

export default Sidebar;