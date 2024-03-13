/**
 * @file Register.js
 * @description Functional component handling user registration.
 * @author @Tarak1246
 * @date Mar 13, 2024
 */
/**
 * @module react
 * @description Import React library for creating React components
 */
import React, { useState, useEffect } from "react";
/**
 * @description Import styles from register.css file
 */
import "./Register.css";
/**
 * @module react-hook-form
 * @description Import useForm hook from react-hook-form for form handling
 */
import { useForm } from "react-hook-form";
/**
 * @module react-router-dom
 * @description Import Link and useNavigate from react-router-dom for navigation
 */
import { Link, useNavigate } from "react-router-dom";
/**
 * @description Import registerUser and getUsers functions from the api service
 */
import { getUsers, registerUser } from "../../services/api";
/**
 * @module react-toastify
 * @description Import toast library for displaying toast notifications.
 * Also import its stylesheet for styling the notifications.
 */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/**
 * @description Import the project tracker image from the images directory
 */
import projectTrackerImage from "../../images/project-tracker.png";

const Register = () => {
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
   * @description Variable to store user data (likely username, etc.) after a successful register.
   * Initially set to an empty string `""`.
   * @type {string}
   */
  let userData = "";
  /**
   * Destructures properties from the useForm hook (react-hook-form library).
   * Provides functions for form validation, state management, error handling,
   * and field value observation.
   *
   * @param {Object} options Configuration options for the useForm hook (optional).
   *
   * @returns {Object} An object containing the following properties:
   *  - register: Function to register form fields for validation.
   *  - handleSubmit: Function to handle form submission and validation.
   *  - setValue: Function to set the value of a specific form field (not included here).
   *  - setError: Function to set an error message for a specific form field.
   *  - clearErrors: Function to clear all or specific form field errors.
   *  - reset: Function to reset the form state to its initial values.
   *  - formState: Object containing the form state with the following property:
   *      - errors: Object containing error messages for each registered field.
   *  - watch: Function to observe the value of a specific form field or multiple fields.
   */
  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({});
  /**
   * @description Fetches usernames from the server on component mount.
   * Fetches usernames and filters for active users upon successful response.
   * Displays an error toast notification if fetching fails.
   */
  useEffect(() => {
    fetchExistingUsers();
  }, []);
  /**
   * @description State variable to store an array of usernames retrieved from the server.
   * Initially set to an empty array `[]`.
   * @type {string[]}
   */
  const [existingUsernames, setExistingUsernames] = useState([]);
  /**
   * @description State variable to store an array of emails filtered from existing users details
   * Initially set to an empty array `[]`.
   * @type {string[]}
   */
  const [existingEmails, setExistingEmails] = useState([]);
  /**
   * @function fetchExistingUsers
   * @description Fetches existing usernames and emails from API to prevent duplication.
   * @async
   * @returns {Promise<void>}
   */
  const fetchExistingUsers = async () => {
    try {
      const response = await getUsers();
      setExistingUsernames(response.data.map((user) => user.username));
      setExistingEmails(response.data.map((user) => user.email));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch existing users. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };
  /**
   * @function handleUsernameChange
   * @description Handles changes to the username input field, validating and displaying errors.
   * @param {React.ChangeEvent<HTMLInputElement>} event The input change event.
   */
  const handleUsernameChange = (event) => {
    const usernameValue = event.target.value;
    if (!usernameValue) {
      setError("username", { type: "manual", message: "Username is required" });
    } else if (existingUsernames.includes(usernameValue)) {
      setError("username", {
        type: "manual",
        message: "Username already exists",
      });
    } else {
      clearErrors("username");
    }
  };
  /**
   * @function handleEmailChange
   * @description Handles changes to the email input field, validating the format and checking for existing users.
   * @param {React.ChangeEvent<HTMLInputElement>} event The input change event.
   */
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    // Validate email format (only allows gmail.com for this example)
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
  };
  /**
   * @function handlePasswordChange
   * @description Handles changes to the password input field, validating its strength.
   * @param {React.ChangeEvent<HTMLInputElement>} event The input change event.
   */
  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    // Password strength regex (enforces at least one uppercase, lowercase, digit, special symbol, and minimum length)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*]).{8,}$/;

    if (!passwordValue) {
      setError("password", { type: "manual", message: "Password is required" });
    } else if (!passwordRegex.test(passwordValue)) {
      setError("password", {
        type: "manual",
        message:
          "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol, and be at least 8 characters long",
      });
    } else {
      clearErrors("password"); // Clear errors for the "password" field
    }
  };

  let password = watch("password");
  /**
   * @function handleConfirmPasswordChange
   * @description Handles changes to the confirm password input field, validating it matches the password.
   * @param {React.ChangeEvent<HTMLInputElement>} event The input change event.
   */
  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value;

    if (!confirmPasswordValue) {
      setError("confirm_password", {
        type: "manual",
        message: "Confirm password is required",
      });
    } else if (confirmPasswordValue !== password) {
      setError("confirm_password", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirm_password"); // Clear errors for the "confirm_password" field
    }
  };
  /**
   * @function userRegistration
   * @description Handles form submission, sends registration request to API, and handles response.
   * @param {RegistrationData} data The registration data from the form.
   * @async
   * @returns {Promise<void>}
   */
  const userRegistration = async (data) => {
    if (Object.keys(errors).length > 0) {
      return; // Prevent form submission if there are errors
    }
    try {
      userData = await registerUser(data);
      if (userData?.status == 201) {
        toast.success(userData.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        navigate("/login");
      } else {
        toast.error(userData.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Request failed. Please try again.`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } finally {
      reset();
      clearErrors();
    }
  };
  /**
   * Renders the registration form component.
   * @returns {JSX.Element} The registration form.
   */
  return (
    <div className="main">
      <div className="rowAB">
        <h1>Project Tracker</h1>
      </div>
      <div className="rowA">
        <img src={projectTrackerImage} alt="project tracker" />
      </div>
      <div className="rowB">
        <h2 className="LRTitle">Register</h2>
        <form onSubmit={handleSubmit(userRegistration)}>
          {/* Username Field */}
          <div className="form-control f-c1">
            <label>
              Username<span id="requiredField">*</span>
            </label>
            <input
              type="text"
              placeholder="enter username"
              title="username"
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
              {...register("username", {
                required: true,
              })}
              onChange={handleUsernameChange}
              autoComplete="off"
              required
            />
            {errors.username && (
              <p className="errorMsg">{errors.username.message}</p>
            )}
          </div>
          {/* Email Field */}
          <div className="form-control f-c1">
            <label>
              Email<span id="requiredField">*</span>
            </label>
            <input
              type="text"
              placeholder="enter email in @gmail.com format"
              title="Email format is @gmail.com"
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
              onChange={handleEmailChange}
              autoComplete="off"
              required
            />
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          </div>
          {/* Password Field */}
          <div className="form-control">
            <label>
              Password<span id="requiredField">*</span>
            </label>
            <input
              type="password"
              placeholder="enter password"
              title="Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol, and be at least 8 characters long"
              style={{
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 50,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
              name="password"
              {...register("password", {
                required: "Password is required.",
              })}
              onChange={handlePasswordChange}
              autoComplete="off"
              required
            />
            {errors.password && (
              <p className="errorMsg">{errors.password.message}</p>
            )}
          </div>
          {/* Confirm Password Field */}
          <div className="form-control">
            <label>
              Confirm Password<span id="requiredField">*</span>
            </label>
            <input
              type="password"
              placeholder="re-enter password"
              title="confirm password"
              style={{
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 50,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
              name="confirm_password"
              {...register("confirm_password", {
                required: true,
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
              onChange={handleConfirmPasswordChange}
              autoComplete="off"
              required
            />
            {errors.confirm_password && (
              <p className="errorMsg">{errors.confirm_password.message}</p>
            )}
          </div>
          {/* Login Link */}
          <p id="registertxt">
            Already have an Account , Want to{" "}
            <Link to="/login">
              <span
                title="click to login"
                onClick={() => {
                  clearErrors([
                    "username",
                    "email",
                    "password",
                    "confirm_password",
                  ]);
                  reset();
                }}
              >
                login
              </span>
            </Link>
          </p>
          <div className="form-control button-container">
            <button
              className="LRBtn"
              type="submit"
              title="register"
              disabled={Object.keys(errors).length > 0}
            >
              Register
            </button>
            <button
              className="LRBtn"
              type="submit"
              title="clear"
              onClick={() => {
                clearErrors([
                  "username",
                  "email",
                  "password",
                  "confirm_password",
                ]);
                reset();
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
