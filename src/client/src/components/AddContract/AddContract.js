import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import "./AddContract.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addContractRecord } from "../../services/api";

const AddContract = () => {
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
      navigate("/home/contracts");
    } catch (error) {
      console.error("Error cancelling contract:", error);
    }
  };
  const onSubmit = async (data) => {
    try {
      const response = await addContractRecord(data);
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
      <h3>Add Contract</h3>
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
                  placeholder="Enter unique contract id"
                  title="contract id"
                />
                {errors.id && <p className="errorMsg">{errors.id.message}</p>}
              </>
            )}
            rules={{ required: "contract ID is required." }}
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
                  placeholder="Enter unique contract name"
                  title="contract name"
                />
                {errors.name && (
                  <p className="errorMsg">{errors.name.message}</p>
                )}
              </>
            )}
            rules={{ required: "contract name is required." }}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  autoComplete="off"
                  placeholder="Enter category"
                  title="category"
                />
                {errors.category && (
                  <p className="errorMsg">{errors.category.message}</p>
                )}
              </>
            )}
            rules={{ required: "category is required." }}
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
          <label>Status</label>
          <Controller
            name="status"
            control={control}
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

export default AddContract;