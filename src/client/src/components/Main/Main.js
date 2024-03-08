// Main.js
import React, { useState, useEffect } from 'react';
import './Main.css';
import Dashboard from '../Dashboard/Dashboard';
import Settings from '../Settings/Settings';
import Projects from '../Projects/Projects';
import Employees from '../Employees/Employees';
import Users from '../Users/Users';

const Main = ({ selectedTab }) => {
  let content;
  useEffect(() => {
   // Call the function on component mount
  }, []); // The empty dependency array ensures it runs only once on mount

  switch (selectedTab) {
    case 'dashboard':
      content = <div className="my-component-container"><Dashboard /></div>
      break;
    case 'projects':
      content = <div className="my-component-container"><Projects /></div>
      break;
    case 'contracts':
      content = <div className="my-component-container">This is {selectedTab} </div>
      break;
    case 'employees':
      content = <div className="my-component-container"><Employees/></div>
      break;
    case 'settings':
      content = <div className="my-component-container"><Settings /></div>
      break;
    case 'users':
      content = <div className="my-component-container"><Users /></div>
      break;
  }

  return (
    <main style={{ paddingLeft: '203px', flex: '1', backgroundColor: '#fff' }}>
      {content}
    </main>
  );
};

export default Main;