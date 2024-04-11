// Projects.js

/*
    This component represents a list of projects with functionality to search, add, edit, and delete projects.
    It utilizes React, React Router, API services for data manipulation, and toast notifications for user feedback.
*/

// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectDbPull, projectRecordDelete } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmToast from "../ConfirmToast/ConfirmToast";
import { useData } from "../DataContext"; // Custom hook for accessing shared data context

const Projects = () => {
  // State variables
  const [data, setData] = useState([]); // Holds project data
  const [searchTerm, setSearchTerm] = useState(""); // Holds search term

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Toast configuration
  toast.configure();
  const navigate = useNavigate(); // Navigate function from React Router
  const { state, setDataa } = useData(); // Custom hook for accessing shared data context

  // Function to handle edit button click
  const handleEditClick = (item) => {
    setDataa(item); // Set shared data context
    navigate(`/home/projects/editProject/${item.id}`); // Navigate to edit project page
  };

  // Function to handle delete button click
  const handleDeleteClick = (item) => {
    // Function to handle confirmation of delete action
    const handleConfirm = async () => {
      await projectRecordDelete(item.id); // Delete project record from database
      setData(data.filter((project) => project.id !== item.id)); // Update project data
      toast.success("Project deleted!", { // Show success message
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      toast.dismiss(toastId); // Dismiss toast notification
    };

    let toastId; // Variable to hold toast ID
    toastId = toast.warning(<ConfirmToast onConfirm={handleConfirm} />, { // Show confirmation toast
      autoClose: false,
      closeButton: true,
    });
  };

  // Function to fetch project data from database
  const fetchData = async () => {
    try {
      let response = await projectDbPull(); // Fetch project data from database
      setData(response.data); // Set project data
    } catch (error) {
      console.error("error fetching data", error); // Log error if data fetching fails
    }
  };

  // Effect hook to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Extract table headers from project data
  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];
  
  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );

  // Function to navigate to add project page
  const addProject = async () => {
    try {
      navigate("/home/projects/addProject"); // Navigate to add project page
    } catch (error) {
      console.error("Error cancelling project:", error); // Log error if navigation fails
    }
  };

  // Function to handle refresh button click
  const handleRefresh = async () => {
    fetchData(); // Refresh project data
  };

  // Render JSX
  return (
    <div>
      <h1 id="projectStyle">Projects</h1>
      <button title="refresh" className="refreshBtn" onClick={handleRefresh}>
        <i className="fa fa-refresh" aria-hidden="true"></i>
        {/* Refresh button icon */}
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        style={{ float: "right" }}
      />
      <button
        className={`btn btn-primary ${(localStorage.getItem("adminPrivilege") != "true") ? 'disabled' : ''}`}                  
        disabled={localStorage.getItem("adminPrivilege") != "true"}
        title="add a Project"
        onClick={() => addProject()}
      >
        ADD
      </button>
      {filteredData.length === 0 ? (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          No projects to display.
        </p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header.toUpperCase()}</th>
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
                  <button className={`actionBtn ${localStorage.getItem("adminPrivilege") != "true" ? 'disabled' : ''}`}                  
                    disabled={localStorage.getItem("adminPrivilege") != "true"} onClick={() => handleEditClick(item)}>Edit</button>
                  <button
                    className={`actionBtn ${localStorage.getItem("adminPrivilege") != "true" ? 'disabled' : ''}`}                  
                    disabled={localStorage.getItem("adminPrivilege") != "true"}
                    onClick={() => handleDeleteClick(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Projects;
