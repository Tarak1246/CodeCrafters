/**
 * @file Settings.js
 * @description Functional component handling user settings.
 * @author @Tarak1246
 * @date Mar 13, 2024
 */

/**
 * @module react
 * @description Import React library for creating React components
 */
import React, { useState, useEffect } from "react";
/**
 * @module react-hook-form
 * @description Import useForm hook from react-hook-form for form handling
 */
import { useForm } from "react-hook-form";
/**
 * @module react-router-dom
 * @description Import Link and useNavigate from react-router-dom for navigation
 */
import { useNavigate } from "react-router-dom";
/**
 * @module react-toastify
 * @description Import toast library for displaying toast notifications.
 * Also import its stylesheet for styling the notifications.
 */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/**
 * @description Import styles from settings.css file
 */
import "./Settings.css";
/**
 * @description Import getLoggedinUserData, updateUserData and getUsers functions from the api service
 */
import {
  getLoggedinUserData,
  updateUserData,
  getUsers,
} from "../../services/api";
// import AuthContext from "../AuthContext";
/**
 * Settings component for user profile management.
 * Fetches user details, allows editing profile information,
 * and handles form validation and error messages.
 *
 * @returns {JSX.Element} The Settings component JSX element.
 */
const Settings = () => {
  /**
   * @description Configures the toast notification system (likely for displaying messages).
   */
  toast.configure();
  /**
   * @description Function for programmatic navigation within the application,
   * likely used for redirecting the user to different routes.
   * Obtained using the `useNavigate` hook from react-router-dom.
   * @type {import('react-router-dom').Navigate}
   */
  const navigate = useNavigate();
  /**
   * Destructures properties from the useForm hook (react-hook-form library).
   * Provides functions for form validation, state management, and error handling.
   *
   * @param {Object} options Configuration options for the useForm hook.
   *        - mode: "all" (default) enables validation for all form fields.
   *
   * @returns {Object} An object containing the following properties:
   *  - register: Function to register form fields for validation.
   *  - handleSubmit: Function to handle form submission and validation.
   *  - setValue: Function to set the value of a specific form field.
   *  - setError: Function to set an error message for a specific form field.
   *  - clearErrors: Function to clear all or specific form field errors.
   *  - reset: Function to reset the form state to its initial values.
   *  - formState: Object containing the form state with the following property:
   *      - errors: Object containing error messages for each registered field.
   */
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  // const { isAuthenticated, user, logout } = useContext(AuthContext);
  /**
   * @description State variable to store the user's profile information as an object.
   * Initially set to an empty object.
   */
  const [formData, setFormData] = useState({});
  /**
   * @description State variable to control the edit mode of the component.
   * True for allowing edits, False for displaying information (view mode).
   * Initially set to false (view mode).
   */
  const [editMode, setEditMode] = useState(false);
  /**
   *  @description State variable to store a list of existing email addresses.
   * Used for validation to prevent duplicate registrations.
   * Initially set to an empty array.
   */
  const [existingEmails, setExistingEmails] = useState([]);
  /**
   * Fetches logged-in user details from the API.
   * Retrieves user data from localStorage and uses it to fetch details.
   * Sets the fetched data in the state variables and form fields.
   * Handles successful responses (status code 200) and errors.
   *
   * @throws {Error} - Re-throws any errors encountered during the process.
   */
  const fetchUserDetails = async () => {
    try {
      let loggedinUser = localStorage.getItem("loginUser");
      let response = await getLoggedinUserData(loggedinUser);
      if (response.status == 200) {
        response = response.data;
        setFormData(response);
        setValue("username", response.username);
        setValue("email", response.email);
        setValue("firstname", response.firstname);
        setValue("lastname", response.lastname);
      } else {
        logoutUser();
        toast.error(response.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user details.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };
  /**
   * Fetches a list of existing email addresses from the API.
   * Updates the state variable `existingEmails` with the retrieved email list.
   * Handles any errors encountered during the process.
   *
   * @throws {Error} - Re-throws any errors encountered during the process.
   */
  const fetchExistingEmails = async () => {
    const response = await getUsers();
    setExistingEmails(response?.data.map((user) => user.email));
  };
  /**
   * Fetches data required for the Settings component on initial render.
   * Fetches a list of existing emails and logged-in user details.
   * Runs only once when the component mounts (empty dependency array).
   */
  useEffect(() => {
    fetchExistingEmails();
    fetchUserDetails();
  }, []);
  /**
   * Handles form submission for updating user profile information.
   * Validates form data using errors object from useForm hook.
   * Prevents submission if errors exist or not in edit mode.
   * Updates user data on the server and updates form state and UI on success.
   * Displays appropriate toast messages for success, errors, or failures.
   *
   * @param {Object} data The user profile data submitted from the form.
   */
  const onSubmit = async (data) => {
    if (!editMode) {
      return; // Prevent submission when not in edit mode
    }
    console.log(errors);

    if (Object.keys(errors).length > 0) {
      return; // Prevent form submission if there are errors
    }

    try {
      const response = await updateUserData(data);
      console.log(response.status);
      if (response.status === 200) {
        setFormData(data);
        setValue("username", data.username);
        setValue("email", data.email);
        setValue("firstname", data.firstname);
        setValue("lastname", data.lastname);
        setEditMode(false); // Switch back to view mode
        toast.success("Profile updated successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        clearErrors();
      } else {
        console.log(response);
        toast.error(response.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
      });
    }
  };
  /**
   * Handles the click event for the edit button.
   * Switches the component to edit mode, allowing form field changes.
   */
  const handleEditClick = () => {
    setEditMode(true);
  };
  /**
   * Handles the click event for the cancel button.
   * Resets the form fields to their initial values
   * retrieved from the API stored in formData state.
   * Clears any validation errors and switches back to view mode.
   */
  const handleCancelClick = () => {
    // Reset form to initial values from API
    if (formData) {
      setValue("username", formData.username);
      setValue("email", formData.email);
      setValue("firstname", formData.firstname);
      setValue("lastname", formData.lastname);
    }
    clearErrors(); // Clear any validation errors
    setEditMode(false);
  };
  /**
   * Handles user logout functionality.
   * Resets the form state using reset(), clears localStorage,
   * and navigates to the login page using the navigate function (likely from react-router-dom).
   */
  const logoutUser = () => {
    reset();
    localStorage.clear();
    navigate("/login");
  };
  /**
   * Handles changes to the email form field.
   * Performs email validation using a regular expression (currently limited to Gmail addresses).
   * Sets errors or clears them based on validation results using setError and clearErrors from useForm.
   * Logs the current errors object for debugging purposes (optional).
   *
   * @param {Object} event The event object triggered by the input change.
   */
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    // Regular expression for email validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailRegex = /^[\w\d._%+-]+@gmail\.com$/;
    if (!emailValue) {
      setError("email", { type: "manual", message: "Email is required" });
    } else if (!emailRegex.test(emailValue)) {
      setError("email", { type: "manual", message: "Email is not valid" });
    } else if (existingEmails.includes(emailValue)) {
      setError("email", { type: "manual", message: "Email already exists" });
    } else {
      clearErrors("email"); // Clear errors for the "email" field
    }
    console.log(errors);
  };
  /**
   * Renders the settings component.
   * @returns {JSX.Element} The user settings form.
   */
  return (
    <div className="main">
      <h1>User Information</h1>
      {/* Edit button (disabled in edit mode) */}
      <button className="editBtn" onClick={handleEditClick} disabled={editMode}>
        Edit
      </button>
      {/* Form for editing user information (conditionally rendered based on formData) */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {formData && (
          <>
            <div className="form-control f-c1">
              <label>
                Username<span id="requiredField">*</span>
              </label>
              <input
                type="text"
                style={{
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 300,
                  height: 50,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                }}
                name="username"
                {...register("username", { required: true })}
                autoComplete="off"
                required
                disabled={true}
              />
            </div>
            <div className="form-control f-c1">
              <label>
                Email<span id="requiredField">*</span>
              </label>
              <input
                type="text"
                style={{
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 300,
                  height: 50,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                }}
                name="email"
                {...register("email", { required: "Email is required." })}
                autoComplete="off"
                required
                onChange={handleEmailChange}
                disabled={!editMode}
              />
              {errors.email && (
                <p className="errorMsg">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control">
              <label>Firstname</label>
              <input
                type="text"
                style={{
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 300,
                  height: 50,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                }}
                name="firstname"
                {...register("firstname", {
                  required: false,
                })}
                autoComplete="off"
                disabled={!editMode}
              />
            </div>
            <div className="form-control">
              <label>Lastname</label>
              <input
                type="text"
                style={{
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 300,
                  height: 50,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                }}
                name="lastname"
                {...register("lastname", {
                  required: false,
                })}
                autoComplete="off"
                disabled={!editMode}
              />
            </div>
            <div className="form-control button-container">
              {/* Edit mode buttons (Save & Cancel) */}
              {editMode ? (
                <>
                  <button
                    className="userEditBtn"
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                    style={{
                      backgroundColor:
                        Object.keys(errors).length > 0 ? "gray" : "lightblue",
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="clearBtn"
                    type="button"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button className="clearBtn" onClick={logoutUser}>
                  {/* View mode button (Logout) */}
                  Logout
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Settings;
