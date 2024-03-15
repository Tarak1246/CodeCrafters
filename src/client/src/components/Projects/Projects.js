import React, { useState, useEffect, navigate} from 'react';
import { useData } from '../DataContext';
import { projectDbPull, projectRecordDelete} from '../../services/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmToast from '../ConfirmToast/ConfirmToast'

const Projects = () => {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { state, setDataa } = useData();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  toast.configure();

  const handleDeleteClick = (item) => {
    let toastId;
    console.log(item);
    const handleConfirm = async () => {
      await projectRecordDelete(item.id)
      console.log('Project deleted!');
      toast.success('Project deleted!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 10000
      });
      toast.dismiss(toastId);
      // navigate('/home');
    };
 

    toastId = toast.warning(<ConfirmToast onConfirm={handleConfirm} />, {
      autoClose: false,
      closeButton: true,
    });
  };

  useEffect(() => {
    const fetchData = async()=>{
      try{
        let response = await projectDbPull();
      //   let response1 = {
      //   "data": [
      //     {
      //       "id": "1",
      //       "name": "project1",
      //       "members": 30,
      //       "client":"ABC",
      //       "start date": "01/01/2024",
      //       "end date": "01/01/2024",
      //       "deadline": "01/01/2024",
      //       "progress":"10%",
      //       "status":"In-progress"
      //     },
      //     {
      //       "id": "2",
      //       "name": "project2",
      //       "members": 20,
      //       "client":"XYZ",
      //       "start date": "01/01/2024",
      //       "end date": "01/01/2024",
      //       "deadline": "01/01/2024",
      //       "progress":"100%",
      //       "status":"Completed"
      //     },
      //   ]
      // };

      setData(response.data);
    }
    catch(error){
      console.error('error fetching data', error);
    }
  }

    fetchData();
  }, []);

  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];
    const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );

  return (
    <div>
      <h1 id="projectStyle" style={{color: 'darkslateblue'}}> Projects </h1>
      <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
          style={{ float: 'right' }}
        />
      <button className="btn btn-primary" title="add a Project" >
      ADD
      </button>
      {filteredData.length === 0 ? (
        <p style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>No projects to display.</p>
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
                  <button className="actionBtn">Edit</button>
                  <button className="actionBtn" onClick={() => handleDeleteClick(item)}>Delete</button>
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