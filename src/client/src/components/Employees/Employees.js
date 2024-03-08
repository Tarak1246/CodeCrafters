// EditPage.js
import React, { useState, useEffect } from 'react';

const Employees = () => {

  useEffect(() => {
    {/* write your code here */}
   // Call the function on component mount
  }, []); // The empty dependency array ensures it runs only once on mount

  return (
    <div>
      <table class='table-wrapper table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Project Name</th>
            <th>Location</th>
            <th>Allocation Start Date</th>
            <th>Allocation End Date</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Role</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
        </div>
  );
};

export default Employees;