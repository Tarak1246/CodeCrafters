/**
 * @file App.js
 * @description Root component of the application.
 * Sets up client-side routing using React Router, manages data context with DataProvider,
 * renders different components based on routes, and enforces a protected layout for authenticated routes.
 * @author @Tarak1246
 */

/**
 * @module react
 * @description Core library for building user interfaces with React.
 */
import React from "react";
/**
 * @module react-router-dom
 * @description Provides components for client-side routing in React applications.
 */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
/**
 * @description Imports CSS styles for the application.
 */
import "./App.css";
/**
 * @description Imports the Layout component responsible for the overall application layout.
 */
import Layout from "./components/Layout/Layout";
/**
 * @description Imports a DataProvider component for managing global application data.
 */
import { DataProvider } from "./components/DataContext";
/**
 * @description Imports the Login component handling user authentication.
 */
import Login from "./components/Login/Login";
/**
 * @description Imports the Register component handling user registration.
 */
import Register from "./components/Register/Register";
/**
 * @description Imports the EditUser component for editing user details.
 */
import EditUser from "./components/EditUser/EditUser";
/**
 * @description Root component of the application.
 * @returns {JSX.Element} The rendered application component.
 */
const App = () => {
  return (
    /**
     * @description Sets up client-side routing using React Router.
     */
    <Router>
      {/* @description Provides a global data context for application data. */}
      <DataProvider>
        {/* @description Defines the routes of the application. */}
        <Routes>
          {/* @description Redirects the index route ('/') to the login page. */}          
          <Route index element={<Navigate to="/login" replace />} />
          {/* @description Renders the Login component for the '/login' route. */}
          <Route path="/login" element={<Login />} />
          {/* @description Renders the Register component for the '/register'
          route. */}
          <Route path="/register" element={<Register />} />
          {/* @description Catch-all route for other routes within the
          application. Renders the Layout component with nested routes. */}
          <Route
            path="/*"
            element={
              /**
               * @description Provides a layout for authenticated views.
               */
              <Layout>
                {/* @description Nested routes within the Layout. */}
                <Routes>
                  {/* @description Redirects '/home' to '/home/dashboard' for
                  consistency. */}
                  <Route
                    exact
                    path="/home"
                    element={<Navigate to="/home/dashboard" replace />}
                  />
                  {/* @description Renders the EditUser component for editing
                  a user with a dynamic ID. */}
                  <Route
                    path="/home/users/editUser/:id"
                    element={<EditUser />}
                  />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </DataProvider>
    </Router>
  );
};

export default App;