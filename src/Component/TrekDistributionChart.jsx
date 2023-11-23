import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const TrekDistributionChart = () => {
  // Sample data for the pie chart
  const data = {
    labels: ['Easy', 'Moderate', 'Difficult'],
    datasets: [
      {
        data: [15, 30, 20], // Replace these values with your actual trek data
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <h2>Trek Difficulty Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default TrekDistributionChart;
