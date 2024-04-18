import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useData } from "../DataContext";
import "./EditEmployee.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateEmployeeRecord,projectDbPull } from "../../services/api";

const EditEmployee = () => {
  toast.configure();
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useData();
  const [formData, setFormData] = useState({});
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});
  const [projectNames, setProjectNames] = useState([]);
   // Function to fetch project data from database
   const fetchData = async () => {
    try {
      let response = await projectDbPull(); // Fetch project data from database
      setProjectNames((response.data).map((item) => item.name));
    } catch (error) {
      console.error("error fetching data", error); // Log error if data fetching fails
    }
  };
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setFormData(state.data);
      fetchData();
    } else {
      localStorage.clear();
      navigate("/login");
    } 
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const response = await updateEmployeeRecord(id, data);
      if (response?.status === 200) {
        toast.success(response?.data, {
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
      console.error("Error updating Employee:", error);
      toast.error("Error updating Employee", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } finally {
      reset();
      navigate("/home/employees");
    }
  };

  const cancelForm = async (e) => {
    try {
      navigate("/home/employees");
    } catch (error) {
      console.error("Error cancelling employee:", error);
    }
  };

  return (
    <div className="editEmployeeComponent">
      {/* heading */}
      <h2>Edit Employee</h2>
      <form className="dynamic-form" onSubmit={handleSubmit(onSubmit)}>
        {/* fetch data from db abd dynamically loop headers from db data object and genrate form based on conditions */}
        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field}</label>
            {field === "id" || field === "name" || field === "email" || field === "location" ? (
              field === "id"  || field === "name" ? (
                <Controller
                  name={field}
                  control={control}
                  defaultValue={formData[field]}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        {...field}
                        autoComplete="off"
                        placeholder="Enter unique contract id"
                        title="contract id"
                        disabled
                      />
                      {errors.id && (
                        <p className="errorMsg">{errors.id.message}</p>
                      )}
                    </>
                  )}
                  rules={{ required: "Contract ID is required." }}
                />
              ) : (
                <Controller
                  name={field}
                  control={control}
                  defaultValue={formData[field]}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        {...field}
                        autoComplete="off"
                        placeholder="Enter unique contract id"
                        title="contract id"
                      />
                      {errors.id && (
                        <p className="errorMsg">{errors.id.message}</p>
                      )}
                    </>
                  )}
                  rules={{ required: "Contract ID is required." }}
                />
              )
            ) : field === "startDate" || field === "endDate" ? (
              <Controller
                name={field}
                control={control}
                defaultValue={
                  formData[field] ? new Date(formData[field]) : null
                }
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    dateFormat="MM/dd/yyyy" // Provided format
                    placeholderText={`Select ${field.name} date`}
                    className="custom-datepicker"
                    showMonthDropdown
                    showYearDropdown
                    yearDropdownItemNumber={100}
                    title={`${field.name} date`}
                  />
                )}
                rules={{ required: `${field} is required.` }}
              />
            ) : field === "type" ? (
              <Controller
                name={field}
                control={control}
                defaultValue={formData[field]}
                render={({ field }) => (
                  <>
                    <select
                      {...field}
                      className="custom-select"
                      title="contract status"
                      style={{ width: "233px", float: "right" }}
                    >
                      <option value="" disabled selected>
                        Select Type status
                      </option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                      
                    </select>
                  </>
                )}
                rules={{ required: "Type is required." }}
              />
                        ) : field ==="designation" ?(
                            <Controller
                                name={field}
                                control={control}
                                defaultValue={formData[field]}
                                render={({ field }) => (
                                    <>
                                        <select
                                            {...field}
                                            className="custom-select"
                                            title="contract status"
                                            style={{ width: "233px", float: "right" }}
                                        >
                                            <option value="" disabled selected>
                                                Select Designation 
                                            </option>
                                            <option value="Software Engineer">Software Engineer</option>
                                            <option value="Product Manager">Product Manager</option>
                                          
                                        </select>
                                    </>
                                )}
                                rules={{ required: "status is required." }}
                            />
                            ) : field === "projectname" ? (
                              <Controller
                                name={field}
                                control={control}
                                defaultValue={formData[field]}
                                render={({ field }) => (
                                    <>
                                        <select
                                            {...field}
                                            className="custom-select"
                                            title="project name"
                                            style={{ width: "233px", float: "right" }}
                                        >
                                            <option value="" disabled selected>
                                                Select Project 
                                            </option>
                                            <option value="Bench">
                                              Bench
                                            </option>
                                            {projectNames && projectNames.map((option) => (
                                              <option key={option} value={option} text={option}>
                                                {option}
                                              </option>
                                            ))}                                          
                                        </select>
                                    </>
                                )}
                                rules={{ required: "status is required." }}
                            />
                            ) : (
                                <Controller
                                    name={field}
                                    control={control}
                                    defaultValue={formData[field]}
                                    render={({ field }) => (
                                        <>
                                            <select
                                                {...field}
                                                className="custom-select"
                                                title="contract status"
                                                style={{ width: "233px", float: "right" }}
                                            >
                                                <option value="" disabled selected>
                                                    Select Role
                                                </option>
                                                <option value="Developer">Developer</option>
                                                <option value="Manager">Manager</option>

                                            </select>
                                        </>
                                    )}
                                    rules={{ required: "status is required." }}
                                />
                            ) }
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

export default EditEmployee;