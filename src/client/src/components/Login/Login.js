import React, { useState, useEffect } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getUsers } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import projectTrackerImage from "../../images/project-tracker.png";

const Login = () => {
  toast.configure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [existingUsernames, setExistingUsernames] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const navigate = useNavigate();
  let userData = "";

  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    fetchExistingUsers();
  }, []);


  const fetchExistingUsers = async () => {
    try {
      const response = await getUsers();
      setExistingUsernames((response.data).map((user) => user.username));
      setActiveUsers(((response.data).filter(obj => obj.status === "active")).map((user) => user.username)); 
    } catch (error) {
      toast.error("Failed to fetch active users. Please try again later.", {
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
        if(activeUsers.includes(usernameValue)){
            clearErrors("username");
        }else{
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

  const userLogin = async (data) => {
    if (Object.keys(errors).length > 0) {
        return;
    }
    try {
      userData = await loginUser(data);
      if (userData?.status == 200) {        
        setToken(userData?.token);
        setIsLoggedIn(true);
        toast.success(userData.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        localStorage.setItem("loginUser", userData?.user?.username);
        localStorage.setItem("loginUserType", userData?.user?.role);
        localStorage.setItem("jwtToken",userData?.token);
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

  return (
    <div className="main">
      <div className="rowAB">
        <h1>Project Tracker</h1>
      </div>
      <div className="rowA">
        <img src={projectTrackerImage} alt="project tracker" />
      </div>
      <div className="rowB">
        <h2 className="LRTitle">Login</h2>
        <form onSubmit={handleSubmit(userLogin)}>
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
          <div className="form-control">
            <label>
              Password<span id="requiredField">*</span>
            </label>
            <input
              type="password"
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
              // onChange={handlePasswordChange}
              autoComplete="off"
              required
            />
            {errors.password && (
              <p className="errorMsg">{errors.password.message}</p>
            )}
          </div>
          <p id="logintxt">
            Don't have an account?{" "}
            <Link to="/register">
              <span
                onClick={() => {
                  clearErrors(["username", "password"]);
                  reset();
                }}
              >register</span>
            </Link>
          </p>
          {errors.apiError && <p>{errors.apiError.message}</p>}
          <div className="form-control button-container">
            <button
              className="LRBtn"
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              Login
            </button>
            <button className="LRBtn" type="submit" onClick={() => {
                  clearErrors([
                    "username",
                    "password"
                  ]);
                  reset();
                }}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
