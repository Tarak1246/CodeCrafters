// EditPage.js
import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";

const Employees = () => {

  useEffect(() => {
    {/* write your code here */}
   // Call the function on component mount
  }, []); // The empty dependency array ensures it runs only once on mount

  return (
    <div>
      <h3>Employees</h3>
      <form class="form-inline" style={{marginBottom:'10px'}}>
      <button class="btn btn-outline-primary my-2 my-sm-0" style={{marginRight: '42.7rem',}} >Add</button>
      <input class="form-control my-2 my-sm-0" type="search" placeholder="Search" aria-label="Search"></input>
      <button class="btn btn-outline-primary my-2 my-sm-0" >Search</button>
      </form>
   
      <table className='emptable table-bordered table-striped table-wrapper table' >
        <thead style={{fontSize:"smaller",}}>
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