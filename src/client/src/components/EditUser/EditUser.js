// EditUser.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "../DataContext";
import "./EditUser.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserPrivileges } from "../../services/api";

const EditUser = () => {
  toast.configure();
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useData(); //JSON.stringify(state.data)
  const [formData, setFormData] = useState({});
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "In active" },
  ];
  const adminPrivilegeOptions = [
    { value: "true", label: "True" },
    { value: "false", label: "False" },
  ];

  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        delete state.data.id;
        setFormData(state.data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching user for edit:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(id);
      console.log(formData);
      // Make PUT request to update item in the database
      formData["adminPrivilege"] = formData["admin privilege"];
      const response  = await updateUserPrivileges(id,formData);
      console.log(response);
      if(response?.status == 200){
        toast.success("user privileges updated!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }else{
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
    } finally{
      navigate("/home/users");
    }
  };

  const cancelForm = async (e) => {
    try {
      navigate("/home/users");
    } catch (error) {
      console.error("Error cancelling user:", error);
    }
  };

  return (
    <div className="editUser">
      <h2>Edit User</h2>
      <form className="dynamic-form" onSubmit={handleFormSubmit}>
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
