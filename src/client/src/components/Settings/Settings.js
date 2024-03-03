import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Settings.css";
import { getUsers,getLoggedinUserData } from "../../services/api";
const Settings = () => {
  toast.configure();
  const navigate = useNavigate();
  let userData = "";

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch user data and populate form fields (replace with your logic)
    const fetchUserDetails = async () => {
      try {
        // let loggedinUser = JSON.parse(localStorage.getItem("loginUser"))
        // console.log(loggedinUser)
        // const response = await getLoggedinUserData(loggedinUser); // Replace with your API call
        // console.log(response);
        // setValue("username", response.username);
        // setValue("firstName", response.firstName);
        // setValue("lastName", response.lastName);
        // setValue("email", response.email); // Assuming you want email to be editable as well
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch user details.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    };
    fetchUserDetails();
  }, []);

  const onSubmit = async (data) => {
    if (!editMode) {
      return; // Prevent submission when not in edit mode
    }
    console.log("Updated user information:", data);
    // Replace with actual logic to update user information in backend
    try {
      const response = await getUsers(data); // Replace with your API call
      if (response.status === 200) {
        toast.success("Profile updated successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        setEditMode(false); // Switch back to view mode after successful update
      } else {
        toast.error(response.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="main">
      <h1>User Information</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            disabled={true} // Username remains disabled
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
            disabled={!editMode} // Enable email editing in edit mode
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
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
          />
        </div>

        <div className="form-control button-container">
          <button
            className="userEditBtn"
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            Edit
          </button>
          <button
            className="clearBtn"
            type="submit"
            onClick={() => {
              clearErrors(["email", "firstname", "lastname"]);
              reset();
            }}
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
