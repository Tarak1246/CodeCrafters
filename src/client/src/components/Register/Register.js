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
  const {
    reset,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({});

  useEffect(() => {
    fetchExistingUsers();
  }, []);

  const [existingUsernames, setExistingUsernames] = useState([]);
  const [existingEmails, setExistingEmails] = useState([]);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

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
    if (existingUsernames.includes(usernameValue)) {
      setUsernameError('Username already exist!');
    } else {
      setUsernameError('');
    }
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
     // Regular expression for email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;///^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/

     if (!emailRegex.test(emailValue)) {
      setEmailError('Email is not valid');
     } else if (existingEmails.includes(emailValue)) {
      setEmailError('Email already exist!');
    } else {
      setEmailError('');
    }
  };

  const navigate = useNavigate();
  let password = watch("password");
  const [login, setlogin] = useState(true);
  let userData = "";

  const userRegistration = async (data) => {
 
    try {
      userData = userData = await registerUser(data);
      if (userData?.status == 200) {
        toast.success(userData.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 10000,
        });
      } else {
        toast.error(userData.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 10000,
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
    }
  };

  return (
    <div>
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
            <label>Username</label>
            <input
              type="text"
              style={{
                borderWidth: 1,
                borderColor: "violet",
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 50,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
              name="username"
              {...register("username", {
                required: "username is required.",
              })}
              onChange={handleUsernameChange}
              autoComplete="off"
            />
            {errors.username && (
              <p className="errorMsg">{errors.username.message}</p>
            )}
            {usernameError && <p className="errorMsg">{usernameError}</p>}
          </div>
          <div className="form-control f-c1">
            <label>Email</label>
            <input
              type="text"
              style={{
                borderWidth: 1,
                borderColor: "violet",
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
            />
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
            {emailError && <p className="errorMsg">{emailError}</p>}

          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              style={{
                borderWidth: 1,
                borderColor: "violet",
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 50,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
              name="password"
              {...register("password", {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 6,
                  matchPattern: (value) =>
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      value
                    ),
                },
              })}
            />
            {errors.password?.type === "required" && (
              <p className="errorMsg">Password is required.</p>
            )}
            {errors.password?.type === "checkLength" && (
              <p className="errorMsg">
                Password should be at-least 6 characters.
              </p>
            )}
            {errors.password?.type === "matchPattern" && (
              <p className="errorMsg">
                Password should contain at least one uppercase letter, lowercase
                letter, digit, and special symbol.
              </p>
            )}
          </div>
          <div className="form-control">
            <label>Confirm Password</label>
            <input
              type="password"
              style={{
                borderWidth: 1,
                borderColor: "violet",
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
            />
            {errors.confirm_password && (
              <p className="errorMsg">{errors.confirm_password.message}</p>
            )}
          </div>
          {errors.apiError && <p>{errors.apiError.message}</p>}
          <p id="registertxt">
            Already have an Account , Want to{" "}
            <Link>
              <span
                onClick={() => {
                  setlogin(true);
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
          <div className="form-control">
            <button
              className="LRBtn"
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
