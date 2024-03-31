/**
 * @file Dashboard.js
 * @description Dashboard component for the project tracker application
 * @author @Prasanna
 * @date Mar 20, 2024
 */

/**
 * @module react
 * @description Import React library for creating React components
 */
import React, { useState, useEffect } from "react";
/**
 * @description importing the Bar and Doughnut components from the react-chartjs-2 library in a JavaScript file
 */
import { Bar, Doughnut } from "react-chartjs-2";
/**
 * @description to create chart with categorical data
 */
import { CategoryScale } from "chart.js";
/**
 * @description imports all chart types
 */
import Chart from "chart.js/auto";
/**
 * @description working with an API for dashboard related data
 */
import { getDashboardData } from "../../services/api";
/**
 * Imports its stylesheet for styling.
 */
import "./Dashboard.css";
/**
 * @description we use "usestate" hook to update state level variables within functional components
 */
const Dashboard = () => {

  const [data, setData] = useState("");
  let [contractData, setContractData] = useState({});
  let [usersData, setUserData] = useState({});
  let [projectData, setProjectData] = useState({});
  let [employeeData, setEmployeeData] = useState({});

/**
 * customizes the appearance and behaviour of the chart component
 */
  const chartOptions = {
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
    },
  };

   // Fetch dashboard data from the API
  const fetchData = async () => {
    try {
      // Updates component state with the retrieved data
      let response = await getDashboardData();
      setData(response?.data);
      projectData = await prepareProjectCount(response?.data?.projects);
      setProjectData(projectData);
      contractData = await prepareContractCount(response?.data?.contracts);
      setContractData(contractData);
      usersData = await prepareUserCount(response?.data?.users);
      setUserData(usersData);
      employeeData = await prepareEmployeeCount(response?.data?.employees);
      setEmployeeData(employeeData);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  useEffect(() => {
    Chart.register(CategoryScale);
    fetchData();
  }, []);

  /** 
   * We define an asynchronous function named prepareProjectCount, 
   * responsible for preparing project-related data for display in a chart format
   */
  /** 
   * We then use the map function on the arr array to go through each state and obtain the matching
   *  count from the data array. If a matched item is identified in the data array based
   *  on the status, we extract the count value; otherwise, we set it to 0.
   */
  const prepareProjectCount = async (data) => {
    const arr = ["In-Progress", "Completed", "InComplete"];
    let cnt = arr.map((value) => {
      const matchedObject = data.find((obj) => obj._id === value);
      return matchedObject ? matchedObject.count : 0;
    });
    return {
      labels: ["In-Progress", "Completed", "InComplete"],
      datasets: [
        {
          label: "Number of Projects",
          data: cnt,
          backgroundColor: [
            "rgba(75,192,192,0.6)",
            "rgba(255,99,132,0.6)",
            "rgba(255,205,86,0.6)",
          ],
        },
      ],
    };
  };
   /** 
   * We define an asynchronous function named prepareContractCount, 
   * responsible for preparing Contract-related data for display in a chart format
   */
  const prepareContractCount = async (data) => {
    const arr = ["In-Progress", "Completed", "InComplete"];
    let cnt = arr.map((value) => {
      const matchedObject = data.find((obj) => obj._id === value);
      return matchedObject ? matchedObject.count : 0;
    });
    return {
      labels: ["In-Progress", "Completed", "InComplete"],
      datasets: [
        {
          data: cnt,
          backgroundColor: [
            "rgba(75,192,192,0.6)",
            "rgba(255,99,132,0.6)",
            "rgba(255,205,86,0.6)",
          ],
        },
      ],
    };
  };
   /** 
   * We define an asynchronous function named prepareUserCount, 
   * responsible for preparing user-related data for display in a chart format
   */
  const prepareUserCount = async (data) => {
    const arr = ["active", "inactive"];
    let cnt = arr.map((value) => {
      const matchedObject = data.find((obj) => obj._id === value);
      return matchedObject ? matchedObject.count : 0;
    });
    return {
      labels: ["active", "inactive"],
      datasets: [
        {
          data: cnt,
          backgroundColor: [
            "rgba(75,192,192,0.6)",
            "rgba(255,99,132,0.6)",
            "rgba(255,205,86,0.6)",
          ],
        },
      ],
    };
  };
   /** 
   * We define an asynchronous function named prepareEmployeeCount, 
   * responsible for preparing employee-related data for display in a chart format
   */
  const prepareEmployeeCount = async (data) => {
    const arr = ["Full Time", "Part Time"];
    let cnt = arr.map((value) => {
      const matchedObject = data.find((obj) => obj._id === value);
      return matchedObject ? matchedObject.count : 0;
    });
    return {
      labels: ["Full Time", "Part Time"],
      datasets: [
        {
          data: cnt,
          backgroundColor: [
            "rgba(75,192,192,0.6)",
            "rgba(255,99,132,0.6)",
            "rgba(255,205,86,0.6)",
          ],
        },
      ],
    };
  };
  //** returns all the related data with the total count */
  return (
    <div className="dashboard-container">
      {data && (
        <div className="card-container">
          <div className="card">
            <h2>Projects</h2>
            {projectData && <Bar data={projectData} options={chartOptions} />}
            <div className="chart-label">
              <p>
                Total:{" "}
                {projectData?.datasets?.[0]?.data?.reduce((acc, val) => acc + val, 0)}
              </p>
            </div>
          </div>
          <div className="card">
            <h2>Contracts</h2>
            {contractData && <Doughnut data={contractData} />}
            <div className="chart-label">
              <p>
                Total:{" "}
                {contractData?.datasets?.[0]?.data?.reduce((acc, val) => acc + val, 0)}
              </p>
            </div>
          </div>
          <div className="card">
            <h2>Employees</h2>
            {employeeData && <Doughnut data={employeeData} />}
            <div className="chart-label">
              <p>
                Total:{" "}
                {employeeData?.datasets?.[0]?.data?.reduce((acc, val) => acc + val, 0)}
              </p>
            </div>
          </div>
          <div className="card">
            <h2>Users</h2>
            {usersData && <Doughnut data={usersData} />}
            <div className="chart-label">
              <p>
                Total:{" "}
                {usersData?.datasets?.[0]?.data?.reduce((acc, val) => acc + val, 0)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  // return (
  //   <div>
  //     {data && (
  //       <div className="dashboard-container">
  //         {projectData && (
  //           <div className="chart-container">
  //             <h2>Projects</h2>
  //             <Bar data={projectData} options={chartOptions} />
  //             <div className="chart-label">
  //               <p>
  //                 Total:{" "}
  //                 {projectData.datasets[0].data.reduce(
  //                   (acc, val) => acc + val,
  //                   0
  //                 )}
  //               </p>
  //             </div>
  //           </div>
  //         )}
  //         {contractData && (
  //           <div className="chart-container">
  //             <h2>Contracts</h2>
  //             <Doughnut data={contractData} />
  //             <div className="chart-label">
  //               <p>
  //                 Total:{" "}
  //                 {contractData.datasets[0].data.reduce(
  //                   (acc, val) => acc + val,
  //                   0
  //                 )}
  //               </p>
  //             </div>
  //           </div>
  //         )}
  //         {usersData && (
  //           <div className="chart-container">
  //             <h2>Users</h2>
  //             <Doughnut data={usersData} />
  //             <div className="chart-label">
  //               <p>
  //                 Total:{" "}
  //                 {usersData.datasets[0].data.reduce(
  //                   (acc, val) => acc + val,
  //                   0
  //                 )}
  //               </p>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Dashboard;
