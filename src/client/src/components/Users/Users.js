// Users.js
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Users.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from "../../services/api";
import { useData } from "../DataContext";
import ConfirmToast from "../ConfirmToast/ConfirmToast";

const Users = () => {
  toast.configure();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { state, setDataa } = useData();

  const fetchData = async () => {
    try {
      const response = await getUsers();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtering data based on the search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );

  // Dynamic headers based on keys of the first item in data
  let tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];
  tableHeaders = tableHeaders.filter((item) => item !== 'id');

  const handleEditClick = (item) => {
    console.log(item);
    // Call the provided callback to handle the edit button click
    // onEditButtonClick();
    setDataa(item);
    // Navigate to the edit page
    navigate(`/home/users/editUser/${item.id}`);
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        style={{ float: "left" }}
      />
      <button className="refreshBtn" onClick={handleRefresh}>Refresh</button>
      <table className="data-table">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{(header).replace(/\b\w/g, (match) => match.toUpperCase())}</th>
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
                  className="actionBtn"
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