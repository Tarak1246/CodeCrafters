/**
 * @file Login.js
 * @description Login component for the project tracker application
 * @author @Tarak1246
 */
/**
 * @module react
 * @description Import React library for creating React components
 */
import React, { useState, useEffect } from "react";
/**
 * @description Import styles from Login.css file
 */
import "./Login.css";
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
 * @description Import loginUser and getUsers functions from the api service
 */
import { loginUser, getUsers } from "../../services/api";
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
/**
 * @description Login component for the Project Tracker application.
 * It handles user login functionality, including form validation,
 * authentication with the server, and user session management.
 */
const Login = () => {
  /**
   * @description Configures the toast notification system (likely for displaying messages).
   */
  toast.configure();
  /**
   * @description State variable to store an array of usernames retrieved from the server.
   * Initially set to an empty array `[]`.
   * @type {string[]}
   */
  const [existingUsernames, setExistingUsernames] = useState([]);
  /**
   * @description State variable to store an array of usernames filtered from existing users
   * who have the "active" status. Initially set to an empty array `[]`.
   * @type {string[]}
   */
  const [activeUsers, setActiveUsers] = useState([]);
  /**
   * @description Function for programmatic navigation within the application,
   * likely used for redirecting the user to different routes.
   * Obtained using the `useNavigate` hook from react-router-dom.
   * @type {import('react-router-dom').Navigate}
   */
  const navigate = useNavigate();
  /**
   * @description Variable to store user data (likely username, token, etc.) after a successful login.
   * Initially set to an empty string `""`.
   * @type {string}
   */
  let userData = "";

  /**
   * @description Destructures properties from the `useForm` hook (likely from react-hook-form).
   * This provides access to functions and state needed for form handling.
   * @param {object} form - The form object returned by the `useForm` hook.
   * @returns {object} An object containing destructured properties.
   */
  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({});
  /**
   * @description Fetches usernames from the server on component mount.
   * Fetches usernames and filters for active users upon successful response.
   * Displays an error toast notification if fetching fails.
   */
  useEffect(() => {
    fetchExistingUsers();
  }, []); // Empty dependency array ensures it runs only once on mount
  /**
   * @description Fetches usernames from the server and updates state variables.
   * Asynchronously fetches user data using the `getUsers` function (likely from an API service).
   * Upon successful response, extracts usernames and filters for active users based on the "status" property.
   * Updates the `existingUsernames` and `activeUsers` state variables with the retrieved data.
   * Displays an error toast notification using `toast` from react-toastify if fetching fails.
   * @returns {Promise<void>} (Doesn't explicitly return a value)
   */
  const fetchExistingUsers = async () => {
    try {
      const response = await getUsers();
      setExistingUsernames(response.data.map((user) => user.username));
      setActiveUsers(
        response.data
          .filter((obj) => obj.status === "active")
          .map((user) => user.username)
      );
    } catch (error) {
      toast.error("Failed to fetch active users. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };
  /**
   * @description Handles username input changes in the form.
   * Checks if the username is empty, exists (active/inactive),
   * and sets errors accordingly using setError and clearErrors from useForm.
   * @param {React.ChangeEvent<HTMLInputElement>} event The change event object.
   * @returns {Promise<void>} (Doesn't explicitly return a value)
   */
  const handleUsernameChange = (event) => {
    const usernameValue = event.target.value;
    if (!usernameValue) {
      setError("username", { type: "manual", message: "Username is required" });
    } else if (existingUsernames.includes(usernameValue)) {
      if (activeUsers.includes(usernameValue)) {
        clearErrors("username");
      } else {
        setError("username", {
          type: "manual",
          message: "User doesn't have privilege to login! Consult your admin",
        });
      }
    } else {
      setError("username", {
        type: "manual",
        message: "User doesn't exist",
      });
    }
  };
  /**
   * @description Handles user login form submission.
   * Prevents submission if there are form errors.
   * Attempts to log in the user using loginUser from the api service,
   * handling successful and failed login attempts with toasts.
   * Resets the form and clears errors after submission (success or failure).
   * @param {any} data The form data (likely containing username and password).
   * @returns {Promise<void>} (Doesn't explicitly return a value)
   */
  const userLogin = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      userData = await loginUser(data);
      if (userData?.status == 200) {
        toast.success(userData.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        localStorage.setItem("loginUser", userData?.user?.username);
        localStorage.setItem("loginUserType", userData?.user?.role);
        localStorage.setItem("jwtToken", userData?.token);
        localStorage.setItem("adminPrivilege", userData?.user?.adminPrivilege);
        navigate("/home");
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
        autoClose: 20000,
      });
    } finally {
      reset();
      clearErrors();
    }
  };
  /**
 * @description Renders the JSX structure for the Login component.
 * @returns {JSX.Element} The JSX element representing the login form.
 */
  return (
    <div className="main">
      {/* Row for application title */}
      <div className="rowAB">
        <h1>Project Tracker</h1>
      </div>
      {/* Row for project tracker logo */}
      <div className="rowA">
        <img src={projectTrackerImage} alt="project tracker" />
      </div>
      {/* Row for login form */}
      <div className="rowB">
        <h2 className="LRTitle">Login</h2>
        <form onSubmit={handleSubmit(userLogin)}>
          {/* Username input field */}
          <div className="form-control f-c1">
            <label>
              Username<span id="requiredField">*</span>
            </label>
            <input
              type="text"
              placeholder="enter username"
              title="username"
              style={{ /* Styling properties for the username input */
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
          {/* Password input field */}
          <div className="form-control">
            <label>
              Password<span id="requiredField">*</span>
            </label>
            <input
              type="password"
              placeholder="enter password"
              title="Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol, and be at least 8 characters long"
              style={{/* Styling properties for the password input */
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
              autoComplete="off"
              required
            />
            {errors.password && (
              <p className="errorMsg">{errors.password.message}</p>
            )}
          </div>
          <p id="logintxt">
            {/* Link to registration page */}
            Don't have an account?{" "}
            <Link to="/register">
              <span
                title="click to register a user"
                onClick={() => {
                  clearErrors(["username", "password"]);
                  reset();
                }}
              >
                register
              </span>
            </Link>
          </p>
          {errors.apiError && <p>{errors.apiError.message}</p>}
          {/* Login and Clear buttons */}
          <div className="form-control button-container">
            <button
              className="LRBtn"
              type="submit"
              title="login"
              disabled={Object.keys(errors).length > 0}
            >
              Login
            </button>
            <button
              className="LRBtn"
              type="submit"
              title="clear"
              onClick={() => {
                clearErrors(["username", "password"]);
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

export default Login;