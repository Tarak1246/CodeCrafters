import React, { useState, useEffect, navigate } from "react";
import { useNavigate } from "react-router-dom";
import { projectDbPull, projectRecordDelete } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmToast from "../ConfirmToast/ConfirmToast";
import { useData } from "../DataContext";

const Projects = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  toast.configure();
  const navigate = useNavigate();
  const { state, setDataa } = useData();

  const handleEditClick = (item) => {
    console.log(item)
    setDataa(item);
    navigate(`/home/addProject/${item.id}`);

  };
  const handleDeleteClick = (item) => {
    let toastId;
    const handleConfirm = async () => {
      await projectRecordDelete(item.id);
      console.log("Project deleted!");
      setData(data.filter((project) => project.id !== item.id));
      toast.success("Project deleted!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      toast.dismiss(toastId);
    };

    toastId = toast.warning(<ConfirmToast onConfirm={handleConfirm} />, {
      autoClose: false,
      closeButton: true,
    });
  };
  const fetchData = async () => {
    try {
      let response = await projectDbPull();
      setData(response.data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );

  const addProject = async () => {
    try {
      navigate("/home/projects/addProject");
    } catch (error) {
      console.error("Error cancelling project:", error);
    }
  };
  const handleRefresh = async () => {
    fetchData();
  };

  return (
    <div>
      <h1 id="projectStyle" style={{ color: "darkslateblue" }}>
        {" "}
        Projects{" "}
      </h1>
      <button title="refresh" className="refreshBtn" onClick={handleRefresh}>
        <i className="fa fa-refresh" aria-hidden="true"></i>
        {/* Refresh button icon */}
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        style={{ float: "right" }}
      />
      <button
        className="btn btn-primary"
        title="add a Project"
        onClick={() => addProject()}
      >
        ADD
      </button>
      {filteredData.length === 0 ? (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          No projects to display.
        </p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header.toUpperCase()}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                {tableHeaders.map((header) => (
                  <td key={header}>{item[header]}</td>
                ))}
                <td>
                  <button className="actionBtn" onClick={() => handleEditClick(item)}>Edit</button>
                  <button
                    className="actionBtn"
                    onClick={() => handleDeleteClick(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Projects;