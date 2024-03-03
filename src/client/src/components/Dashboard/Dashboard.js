import React, {useEffect} from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import './Dashboard.css';
import {getDashboardData} from '../../services/api';

const Dashboard = () => {
  useEffect(() => {

  }, []);

  return (
    <div className="dashboard-container">
      This is dashboard
    {/* write code here */} 
    </div>
  );
};

export default Dashboard;
