import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

// Register necessary chart elements
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

interface DoughnutChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const DoughnutChart: FC<DoughnutChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
