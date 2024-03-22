import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import "./AddEmployee.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addEmployeeRecord } from "../../services/api";

const AddEmployee = () => {
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
      navigate("/home/employees");
    } catch (error) {
      console.error("Error cancelling contract:", error);
    }
  };
  const onSubmit = async (data) => {
    try {
      const response = await addEmployeeRecord(data);
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
      console.error("Error adding contract:", error);
      toast.error("Error updating contract", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } finally {
      reset();
      navigate("/home/contracts");
    }
  };

  return (
    <div className="contractComponent">
      <h3>Add Employee</h3>
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
                  placeholder="Enter unique employee id"
                  title="employee id"
                />
                {errors.id && <p className="errorMsg">{errors.id.message}</p>}
              </>
            )}
            rules={{ required: "Employee ID is required." }}
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
                  placeholder="Enter unique employee name"
                  title="employee name"
                />
                {errors.name && (
                  <p className="errorMsg">{errors.name.message}</p>
                )}
              </>
            )}
            rules={{ required: "employee name is required." }}
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className="custom-select"
                  title="employee type"
                  style={{ width: "233px", float: "right" }}
                >
                  <option value="" disabled selected>
                    Select employee type
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </>
            )}
            rules={{ required: "type is required." }}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  autoComplete="off"
                  placeholder="Enter unique employee email"
                  title="employee email"
                />
                {errors.name && (
                  <p className="errorMsg">{errors.name.message}</p>
                )}
              </>
            )}
            rules={{ required: "employee email is required." }}
          />
        </div>

        <div className="form-group">
          <label>Project Name</label>
          <Controller
            name="projectname"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  autoComplete="off"
                  placeholder="Enter project name"
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
          <label>Location</label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  autoComplete="off"
                  placeholder="Enter project location name"
                  title="project location name"
                />
                {errors.name && (
                  <p className="errorMsg">{errors.name.message}</p>
                )}
              </>
            )}
            rules={{ required: "project location name is required." }}
          />
        </div>

        <div className="form-group">
          <label>Allocation Start Date</label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  {...field}
                  selected={field.value}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select start date"
                  className="custom-datepicker"
                  showMonthDropdown
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  title="allocation start date"
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
          <label>Allocation End Date</label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  {...field}
                  selected={field.value}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select end date"
                  className="custom-datepicker"
                  showMonthDropdown
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  title="end date"
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
          <label>Designation</label>
          <Controller
            name="designation"
            control={control}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className="custom-select"
                  title="designation"
                  style={{ width: "233px", float: "right" }}
                >
                  <option value="" disabled selected>
                    Select designation
                  </option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Product Manager">Product Manager</option>
                </select>
              </>
            )}
            rules={{ required: "designation is required." }}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className="custom-select"
                  title="role"
                  style={{ width: "233px", float: "right" }}
                >
                  <option value="" disabled selected>
                    Select role
                  </option>
                  <option value="Developer">Developer</option>
                  <option value="Manager">Manager</option>
                </select>
              </>
            )}
            rules={{ required: "role is required." }}
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

export default AddEmployee;