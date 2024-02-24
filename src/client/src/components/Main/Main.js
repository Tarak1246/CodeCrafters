// Main.js
import React, { useState, useEffect } from 'react';
import './Main.css';
const Main = ({ selectedTab }) => {
  let content;
  useEffect(() => {
   // Call the function on component mount
  }, []); // The empty dependency array ensures it runs only once on mount

  switch (selectedTab) {
    case 'dashboard':
      content = <div className="my-component-container">This is {selectedTab} </div>
      break;
    case 'projects':
      content = <div className="my-component-container">This is {selectedTab} </div>
    case 'contracts':
      content = <div className="my-component-container">This is {selectedTab} </div>
      break;
    case 'employees':
      content = <div className="my-component-container">This is {selectedTab} </div>
      break;
    case 'settings':
      content = <div className="my-component-container">This is {selectedTab} </div>
      break;
  }

  return (
    <main style={{ paddingLeft: '209px', flex: '1', backgroundColor: '#fff' }}>
      {content}
    </main>
  );
};

export default Main;