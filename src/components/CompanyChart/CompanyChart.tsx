import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const options: any | Chart.ChartOptions = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      font: {
        family: "Poppins",
        size: 18,
        weight: "bold",
      },
    },
    legend: {
      display: true,
      labels: {
        font: {
          family: "Poppins",
          size: 14,
        },
      },
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      ticks: {
        font: {
          family: "Poppins",
          size: 12,
        },
        callback: function (value: string) {
          return value.toLocaleString();
        },
      },
    },
    x: {
      display: true,
      ticks: {
        font: {
          family: "Poppins", // Set the Poppins font for the tick labels
          size: 12,
        },
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Users",
      data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
      fill: true,
      backgroundColor: "rgba(137, 226, 185, 0.4)",
      borderColor: "#2EB875",
      tension: 0.4,
      yAxisID: "y",
    },
  ],
};

export default function CompanyChart() {
  return <Line options={options} data={data} />;
}
