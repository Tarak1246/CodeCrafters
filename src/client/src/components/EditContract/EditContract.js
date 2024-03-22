import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useData } from "../DataContext";
import "./EditContract.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateContractRecord } from "../../services/api";

const EditContract = () => {
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
      const response = await updateContractRecord(id, data);
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
      console.error("Error updating contract:", error);
      toast.error("Error updating contract", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } finally {
      reset();
      navigate("/home/contracts");
    }
  };

  const cancelForm = async (e) => {
    try {
      navigate("/home/contracts");
    } catch (error) {
      console.error("Error cancelling contract:", error);
    }
  };

  return (
    <div className="editContractComponent">
      {/* heading */}
      <h2>Edit Contract</h2>
      <form className="dynamic-form" onSubmit={handleSubmit(onSubmit)}>
        {/* fetch data from db abd dynamically loop headers from db data object and genrate form based on conditions */}
        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field}</label>
            {field === "id" || field === "name" || field === "category" ? (
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
                        Select contract status
                      </option>
                      <option value="InComplete">In Complete</option>
                      <option value="In-Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </>
                )}
                rules={{ required: "status is required." }}
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

export default EditContract;