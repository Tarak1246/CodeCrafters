import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Settings.css";
import { getLoggedinUserData, updateUserData } from "../../services/api";
// import AuthContext from "../AuthContext";

const Settings = () => {
  toast.configure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  // const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    // if (!isAuthenticated) {
    //   logout();
    //   navigate('/login');
    // }
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
    fetchUserDetails();
  }, []);

  const onSubmit = async (data) => {
    if (!editMode) {
      return; // Prevent submission when not in edit mode
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
    } finally {
      clearErrors();
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    // Reset form to initial values from API
    if (formData) {
      setValue("username", formData.username);
      setValue("email", formData.email);
      setValue("firstname", formData.firstname);
      setValue("lastname", formData.lastname);
    }
    clearErrors(); // Clear any validation errors
  };

  const logoutUser = () => {
    reset();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="main">
      <h1>User Information</h1>
      <button className="editBtn" onClick={handleEditClick} disabled={editMode}>
        Edit
      </button>
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
              {editMode ? (
                <>
                  <button
                    className="userEditBtn"
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
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
