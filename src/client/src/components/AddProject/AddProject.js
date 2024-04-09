/**
* @author @Satyaaneesh98
*/

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import "./AddProject.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addProjectRecord } from "../../services/api";

const AddProject = () => {
  toast.configure();
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const cancelForm = async (e) => {
    try {
      navigate("/home/projects");
    } catch (error) {
      console.error("Error cancelling contract:", error);
    }
  };
  const onSubmit = async (data) => {
    try {
      const response = await addProjectRecord(data);
      console.log(response);
      if (response?.status == 201) {
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
      console.error("Error adding project:", error);
      toast.error("Error updating project", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } finally {
      reset();
      navigate("/home/projects");
    }
  };

  return (
    <div className="projectComponent">
      <h3>Add Project</h3>
      <form className="dynamic-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>ID</label>
          <Controller
            name="id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  autoComplete="off"
                  placeholder="Enter unique project id"
                  title="project id"
                />
                {errors.id && <p className="errorMsg">{errors.id.message}</p>}
              </>
            )}
            rules={{ required: "Project ID is required." }}
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  autoComplete="off"
                  placeholder="Enter unique project name"
                  title="project name"
                />
                {errors.name && (
                  <p className="errorMsg">{errors.name.message}</p>
                )}
              </>
            )}
            rules={{ required: "project name is required." }}
          />
        </div>

        <div className="form-group">
          <label>Client</label>
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  autoComplete="off"
                  placeholder="Enter client name"
                  title="client name"
                />
                {errors.client && (
                  <p className="errorMsg">{errors.client.message}</p>
                )}
              </>
            )}
            rules={{ required: "client name is required." }}
          />
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  {...field}
                  selected={field.value}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select project start date"
                  className="custom-datepicker"
                  showMonthDropdown
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  title="project start date"
                />
                {errors.startDate && (
                  <p className="errorMsg">{errors.startDate.message}</p>
                )}
              </>
            )}
            rules={{ required: "start date is required." }}
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  {...field}
                  selected={field.value}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select project end date"
                  className="custom-datepicker"
                  showMonthDropdown
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  title="project end date"
                />
                {errors.endDate && (
                  <p className="errorMsg">{errors.endDate.message}</p>
                )}
              </>
            )}
            rules={{ required: "end date is required." }}
          />
        </div>

        <div className="form-group">
          <label>Deadline</label>
          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  {...field}
                  selected={field.value}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select project deadline date"
                  className="custom-datepicker"
                  showMonthDropdown
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  title="project deadline"
                />
                {errors.deadline && (
                  <p className="errorMsg">{errors.deadline.message}</p>
                )}
              </>
            )}
            rules={{ required: "deadline is required." }}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <Controller
            name="status"
            control={control}
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
        </div>
        <div className="form-group">
          <label>Progress</label>
          <Controller
            name="progress"
            control={control}
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
        </div>

        <div className="form-group">
          <button
            type="submit"
            style={{
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 50,
              color: "white",
              borderRadius: 40,
            }}
          >
            Submit
          </button>
          <button
            style={{
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 50,
              color: "white",
              borderRadius: 40,
            }}
            onClick={cancelForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;