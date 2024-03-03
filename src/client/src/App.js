import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import { DataProvider } from './components/DataContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';

const App = () => {

  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route exact path="/home" element={<Navigate to="/home/dashboard" replace />} />
                  {/* <Route path="/home/dashboard" element={<Dashboard />} />
                  <Route path="/home/settings" element={<Settings />} /> */}
                   { /* add routes here */ }
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