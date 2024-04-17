/**
 * @fileoverview Users component for displaying and managing user data.
 * @author @Tarak1246
 * @date Mar 13, 2024
 */
/**
 * @module react
 * @description Import React library for creating React components
 */
import React, { useState, useEffect } from "react";
/**
 * @module react-router-dom
 * @description Import Link and useNavigate from react-router-dom for navigation
 */
import { useNavigate } from "react-router-dom";
/**
 * @description Import styles from users.css file
 */
import "./Users.css";
/**
 * @module react-toastify
 * @description Import toast library for displaying toast notifications.
 * Also import its stylesheet for styling the notifications.
 */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/**
 * @description Import getUsers functions from the api service
 */
import { getUsers } from "../../services/api";
/**
 * @description Imports the `useData` hook from the DataContext to access and potentially manage application data.
 */
import { useData } from "../DataContext";
/**
 *  @description Users component that renders a table of users with search and edit functionality.
 */
const Users = () => {
  /**
   * Configures Toastify for displaying toast notifications.
   */
  toast.configure();
  /**
   * State variables:
   * @type {Array<object>} data - Array of user objects fetched from the API
   * @type {string} searchTerm - User's search query
   */
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * @type {import('react-router-dom').NavigateFunction} navigate - Function for programmatic navigation
   */
  const navigate = useNavigate();
  /**
   * @type {object} state - State from the DataContext
   * @type {(data: any) => void} setDataa - Function to update DataContext state
   */
  const { state, setDataa } = useData();
  /**
   * Fetches user data from the API.
   *
   * @async
   * @returns {Promise<void>} - Resolves after fetching data or rejects if an error occurs.
   */
  const fetchData = async () => {
    try {
      const response = await getUsers();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  /**
   * Fetches user data on component mount and handles potential errors.
   *
   * @useEffect Hook
   * @param {Array<any>} deps - Empty dependency array, ensuring fetchData runs only once on mount
   */
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      fetchData();
    } else {
      localStorage.clear();
      navigate("/login");
    } 
  }, []);
  /**
   *  @description Handles changes to the search input.
   * @param {object} event - The input event
   */
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * @description Filters the user data based on the search term.
   * @returns {Array<object>} - Filtered user data
   */
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );

  /**
   * @description Generates dynamic table headers based on the keys of the first user object.
   * @returns {string[]} - Array of table header names
   */
  let tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];
  tableHeaders = tableHeaders.filter((item) => item !== "id");
  /**
   * @description Handles clicking the Edit button for a user.
   * @param {object} item - The user object to edit
   */
  const handleEditClick = (item) => {
    setDataa(item);
    navigate(`/home/users/editUser/${item.id}`);
  };
  /**
   * @description Handles clicking the refresh button to fetch data again.
   * @async
   */
  const handleRefresh = async () => {
    fetchData();
  };
  /**
 * Renders the Users component with search bar, table, and edit functionality.
 * 
 * @returns {JSX.Element} - The rendered JSX element representing the component's UI.
 */
  return (
    <div className="usersComponent">
      <h1>Users</h1>{/* Heading for the Users section */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        style={{ float: "left" }}
      />{/* Search input for filtering users */}
      <button title="refresh" className="refreshBtn" onClick={handleRefresh}>
        <i className="fa fa-refresh" aria-hidden="true"></i>{/* Refresh button icon */}
      </button>
      <table className="data-table">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>
                {header.replace(/\b\w/g, (match) => match.toUpperCase())}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              {tableHeaders.map((header) => (
                <td key={header}>{item[header]}</td>
              ))}
              <td>
                <button
                  className={`actionBtn ${item['role'] === 'admin' ? 'disabled' : ''}`}                  
                  disabled={item['role'] === 'admin'}
                  title="cannot edit for admin role"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;