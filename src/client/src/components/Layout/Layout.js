// Layout.js
import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import './Layout.css'
import Main from '../Main/Main';

const Layout = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <Sidebar onTabClick={handleTabClick} />
        <Main selectedTab={selectedTab}/>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;