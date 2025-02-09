import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

// Register necessary chart elements
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const DoughnutChart = ({ data }) => {
  const chartData = {
    labels: data.labels, // Use dynamic labels passed as props
    datasets: [
      {
        data: data.values, // Data points for the chart
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Different colors for the sections
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={chartData} />
    </div>
  );
};

export default DoughnutChart;
