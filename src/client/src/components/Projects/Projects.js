import React, { useState, useEffect } from 'react';
import { useData } from '../DataContext';

const Projects = () => {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { state, setDataa } = useData();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async()=>{
      try{
        let response = {
        "data": [
          {
            "id": "1",
            "name": "project1",
            "members": 30,
            "client":"ABC",
            "start date": "01/01/2024",
            "end date": "01/01/2024",
            "deadline": "01/01/2024",
            "progress":"10%",
            "status":"In-progress"
          },
          {
            "id": "2",
            "name": "project2",
            "members": 20,
            "client":"XYZ",
            "start date": "01/01/2024",
            "end date": "01/01/2024",
            "deadline": "01/01/2024",
            "progress":"100%",
            "status":"Completed"
          },
        ]
      };

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
                  <button className="actionBtn" >Edit</button>
                  <button className="actionBtn" >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  );
};

export default Projects;