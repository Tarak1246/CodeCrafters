import React, { useState, useEffect } from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, registerUser } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import projectTrackerImage from "../../images/project-tracker.png";

const Register = () => {
  toast.configure();
  const navigate = useNavigate();
  let userData = "";

  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({});

  useEffect(() => {
    fetchExistingUsers();
  }, []);

  const [existingUsernames, setExistingUsernames] = useState([]);
  const [existingEmails, setExistingEmails] = useState([]);

  const fetchExistingUsers = async () => {
    try {
      const response = await getUsers();
      console.log(response.data)
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

  const handleUsernameChange = (event) => {
    const usernameValue = event.target.value;
    if (!usernameValue) {
      setError("username", { type: "manual", message: "Username is required" });
    } else if (existingUsernames.includes(usernameValue)) {
      setError("username", { type: "manual", message: "Username already exists" });
    } else {
      clearErrors("username");
    }
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
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

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;    
    // Regular expression for password validation 
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*]).{8,}$/;
  
    if (!passwordValue) {
      setError("password", { type: "manual", message: "Password is required" });
    } else if (!passwordRegex.test(passwordValue)) {
      setError("password", { type: "manual", message: "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol, and be at least 8 characters long" });
    } else {
      clearErrors("password"); // Clear errors for the "password" field
    }
  };

  let password = watch("password");

  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value;
    
    if (!confirmPasswordValue) {
      setError("confirm_password", { type: "manual", message: "Confirm password is required" });
    } else if (confirmPasswordValue !== password) {
      setError("confirm_password", { type: "manual", message: "Passwords do not match" });
    } else {
      clearErrors("confirm_password"); // Clear errors for the "confirm_password" field
    }
  };
  
  const userRegistration = async (data) => { 
    if (Object.keys(errors).length > 0) {
      return; // Prevent form submission if there are errors
    }
    try {
      userData = userData = await registerUser(data);
      if (userData?.status == 200) {
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
    }
  };

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
          <div className="form-control f-c1">
            <label>Username<span id="requiredField">*</span></label>
            <input
              type="text"
              style={{
                borderWidth: 1,
                //borderColor: "violet",
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
            {errors.username && (<p className="errorMsg">{errors.username.message}</p>)}
          </div>
          <div className="form-control f-c1">
            <label>Email<span id="requiredField">*</span></label>
            <input
              type="text"
              style={{
                borderWidth: 1,
                //borderColor: "violet",
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 50,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
              name="email"
              {...register("email", {required: "Email is required."})}
              onChange={handleEmailChange}
              autoComplete="off"
              required
            />
            {errors.email && (<p className="errorMsg">{errors.email.message}</p>)}
          </div>
          <div className="form-control">
            <label>Password<span id="requiredField">*</span></label>
            <input
              type="password"
              style={{
                borderWidth: 1,
                //borderColor: "violet",
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 50,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
              name="password"
              {...register("password", {
                required: "Password is required."
              })}
              onChange={handlePasswordChange}
              autoComplete="off"
              required
            />
            {errors.password && (<p className="errorMsg">{errors.password.message}</p>)}
          </div>
          <div className="form-control">
            <label>Confirm Password<span id="requiredField">*</span></label>
            <input
              type="password"
              style={{
                borderWidth: 1,
                //borderColor: "violet",
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
                validate: value => value === password || "The passwords do not match"
              })}
              onChange={handleConfirmPasswordChange}
              autoComplete="off"
              required
            />
            {errors.confirm_password && (<p className="errorMsg">{errors.confirm_password.message}</p>)}
          </div>
          <p id="registertxt">
            Already have an Account , Want to{" "}
            <Link to="/login">
              <span
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
            <button className="LRBtn" type="submit" disabled={Object.keys(errors).length > 0}>Register</button>
            <button className="LRBtn" type="submit" onClick={() => {
                  clearErrors([
                    "username",
                    "email",
                    "password",
                    "confirm_password",
                  ]);
                  reset();
                }}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
