// EditPage.js
import React, { useState, useEffect } from 'react';

const Projects = () => {

  useEffect(() => {
    {/* write your code here */}
   // Call the function on component mount
  }, []); // The empty dependency array ensures it runs only once on mount

  return (
    <div>
    {<table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Members</th>
            <th>Client</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Deadline</th>
            <th>Progress</th>
            <th>Status</th>
        </tr>
        <tr>
            <td>1</td>
            <td>Project1</td>
            <td>30</td>
            <td>ABC</td>
            <td>01/01/2024</td>
            <td>08/01/2024</td>
            <td>07/01/2024</td>
            <td>10%</td>
            <td>In-Progress</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Project2</td>
            <td>10</td>
            <td>HSBC</td>
            <td>01/01/2025</td>
            <td>10/01/2025</td>
            <td>09/01/2025</td>
            <td>5%</td>
            <td>In-Progress</td>
        </tr>
    </table>}
    </div>
  );
};

export default Projects;