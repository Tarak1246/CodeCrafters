// EditPage.js
import React, { useState, useEffect } from 'react';
import { useData } from '../DataContext';

const Projects = () => {

  const [data, setData] = useState([]);
  const { state, setDataa } = useData();

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
  }, []); // The empty dependency array ensures it runs only once on mount

  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <h1>Projects</h1>
    </div>
  );
};

export default Projects;