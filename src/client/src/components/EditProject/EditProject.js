import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useData } from "../DataContext";
import "./EditProject.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {updateProjectRecord} from "../../services/api";

const EditProject = () => {
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

  useEffect(() => {
    setFormData(state.data);
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const response = await updateProjectRecord(id, data);
      if (response?.status == 200) {
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
      console.error("Error updating project:", error);
      toast.error("Error updating project", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } finally {
      reset();
      navigate("/home/projects");
    }
  };

  const cancelForm = async (e) => {
    try {
      navigate("/home/projects");
    } catch (error) {
      console.error("Error cancelling project:", error);
    }
  };

  return (
    <div className="editProjectComponent">
      {/* heading */}
      <h2>Edit Project</h2>
      <form className="dynamic-form" onSubmit={handleSubmit(onSubmit)}>
        {/* fetch data from db abd dynamically loop headers from db data object and genrate form based on conditions */}
        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field}</label>
            {field === "id" || field === "name" || field === "client" ? (
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
                      placeholder="Enter unique project id"
                      title="project id"
                    />
                    {errors.id && (
                      <p className="errorMsg">{errors.id.message}</p>
                    )}
                  </>
                )}
                rules={{ required: "Project ID is required." }}
              />
            ) : field === "startDate" ||
              field === "endDate" ||
              field === "deadline" ? (
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
            ) : field === "status" ? (
              <Controller
                name={field}
                control={control}
                defaultValue={formData[field]}
                render={({ field }) => (
                  <>
                    <select
                      {...field}
                      className="custom-select"
                      title="project status"
                      style={{ width: "233px", float: "right" }}
                    >
                      <option value="" disabled selected>
                        Select project status
                      </option>
                      <option value="InComplete">In Complete</option>
                      <option value="In-Progress">In Progress</option>
                      <option value="Completed">Completed</option>
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
                      title="project progress"
                      style={{ width: "233px", float: "right" }}
                    >
                      <option value="" disabled selected>
                        Select project progress
                      </option>
                      <option value="0% - Req & Design Phase">
                        0% - Req & Design Phase
                      </option>
                      <option value="25% - Development Phase">
                        25% - Development Phase
                      </option>
                      <option value="50% - Testing Phase">
                        50% - Testing Phase
                      </option>
                      <option value="75% - Support Phase">
                        75% - Support Phase
                      </option>
                      <option value="100% - Completed">100% - Completed</option>
                    </select>
                  </>
                )}
                rules={{ required: "progress is required." }}
              />
            )}
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

export default EditProject;
