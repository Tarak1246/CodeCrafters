/**
 * @file Edituser.js
 * @description Edituser component for the project tracker application
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
import { useParams, useNavigate } from "react-router-dom";
/**
 * @description Imports the `useData` hook from the DataContext to access and potentially manage application data.
 */
import { useData } from "../DataContext";
/**
 * @description Import styles from edituser.css file
 */
import "./EditUser.css";
/**
 * @module react-toastify
 * @description Import toast library for displaying toast notifications.
 * Also import its stylesheet for styling the notifications.
 */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/**
 * @description Import updateUserPrivileges functions from the api service
 */
import { updateUserPrivileges } from "../../services/api";
/**
 * EditUser component for editing user privileges (status and adminPrivilege).
 *
 * @returns {JSX.Element} - The rendered JSX element representing the edit user form.
 */
const EditUser = () => {
  /**
   * Configures Toastify for displaying toast notifications.
   */
  toast.configure();
  /**
   * Extracts the user ID from the URL parameters.
   */
  const { id } = useParams();
  /**
   * @type {import('react-router-dom').NavigateFunction} navigate - Function for programmatic navigation
   */
  const navigate = useNavigate();
  /**
   * @type {object} state - Data from the DataContext (consider renaming to something more specific)
   */
  const { state } = useData(); //JSON.stringify(state.data)
  /**
   * @type {object} formData - State object to store user data for editing
   */
  const [formData, setFormData] = useState({});
  /**
   * Options for the "status" select field.
   * @type {Array<{ value: string, label: string }>}
   */
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "In active" },
  ];
  /**
   * Options for the "adminPrivilege" select field.
   * @type {Array<{ value: string, label: string }>}
   */
  const adminPrivilegeOptions = [
    { value: "true", label: "True" },
    { value: "false", label: "False" },
  ];
 
  /**
   * Fetches user data for editing and sets the initial form state.
   *
   * @useEffect Hook
   * @param {string} deps - The user ID dependency, ensuring data is fetched only once on mount
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        delete state.data.id;
        setFormData(state.data);
      } catch (error) {
        console.error("Error fetching user for edit:", error);
      }
    };
    if (localStorage.getItem("jwtToken")) {
      fetchData();
    } else {
      localStorage.clear();
      navigate("/login");
    } 
  }, [id]);
  /**
   * Handles changes to form input fields.
   *
   * @param {object} e - The event object from the input change
   */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  /**
   * Handles form submission and updates user privileges in the database.
   *
   * @param {object} e - The submit event object
   * @async
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make PUT request to update item in the database
      formData["adminPrivilege"] = formData["admin privilege"];
      const response = await updateUserPrivileges(id, formData);
      console.log(response);
      if (response?.status == 200) {
        toast.success("user privileges updated!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      } else {
        toast.error(response?.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Error updating user", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } finally {
      navigate("/home/users");
    }
  };
  /**
   * Handles canceling the edit form and navigates back to the users list.
   *
   * @param {object} e - The click event object
   * @async
   */
  const cancelForm = async (e) => {
    try {
      navigate("/home/users");
    } catch (error) {
      console.error("Error cancelling user:", error);
    }
  };
  /**
   * Renders the Edit User form with user data and controls for editing.
   *
   * @returns {JSX.Element} - The JSX element representing the Edit User form.
   */
  return (
    <div className="editUser">
      {/* heading */}
      <h2>Edit User</h2>
      <form className="dynamic-form" onSubmit={handleFormSubmit}>
        {/* fetch data from db abd dynamically loop headers from db data object and genrate form based on conditions */}
        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field}</label>
            {field === "username" || field === "email" || field === "role" ? (
              <input
                type="text"
                id={field}
                name={field}
                className="form-control"
                value={formData[field]}
                onChange={handleFormChange}
                disabled={true}
              />
            ) : field === "status" ? (
              <select
                id={field}
                name={field}
                className="form-control"
                value={formData[field]}
                onChange={handleFormChange}
              >
                {/* dropdown */}
                <option value="" disabled={true}>
                  Select...
                </option>{" "}
                {statusOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    defaultValue={option.value === formData[field]}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <select
                id={field}
                name={field}
                className="form-control"
                value={formData[field]}
                onChange={handleFormChange}
              >
                {/* dropdown */}
                <option value="" disabled={true}>
                  Select...
                </option>{" "}
                {adminPrivilegeOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    defaultValue={option.value === formData[field]}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        {/* buttons */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button className="btn btn-primary" onClick={() => cancelForm()}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUser;