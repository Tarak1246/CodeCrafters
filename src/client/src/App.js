import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Switch } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import './App.css';
import Layout from './components/Layout/Layout';
import { DataProvider } from './components/DataContext';

const App = () => {

  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route exact path="/home" element={<Navigate to="/home/dashboard" replace />} />
                   { /* add routes here */ }|
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;