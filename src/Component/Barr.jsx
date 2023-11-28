import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bar Chart",
    },
  },
  maintainAspectRatio: false, // Add this line to allow adjusting the height
  // height: 1000,
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// Replace the sample data with your actual data for queries posted in each month
const queryData = [1019, 2425, 1335, 2120, 1220, 2135, 3328];

const data = {
  labels,
  datasets: [
    {
      label: "Queries Posted",
      data: queryData,
      backgroundColor: "rgba(47,79,79, 0.7)",
    },
  ],
};

export function Barr() {
  return    <Bar style={{height:"70vh", marginBottom:"20vh"}} options={options} data={data} />;
}
