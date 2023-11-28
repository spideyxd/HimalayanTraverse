import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const TrekDistributionChart = () => {
  // Sample data for the pie chart
  const data = {
    labels: ["Renting Gears", "Queries", "Exploring treks"],
    datasets: [
      {
        data: [2583, 3430, 7840], // Replace these values with your actual trek data
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: " Pie Chart",
      },
    },
    elements: {
      arc: {
        borderWidth: 0.5,
      },
    },
    layout: {
      padding: 20,
    },
    radius: 200, // Adjust this value to control the size of the pie chart
  };

  return (
    <div className="mt-5">
      <Pie options={options} data={data} />
    </div>
  );
};

export default TrekDistributionChart;
