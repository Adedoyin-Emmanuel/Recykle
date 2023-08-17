import React from "react";
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

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Recycling Points Earned", // Your chart title
      font: {
        family: "Poppins", // Set the Poppins font for the title
        size: 18,
        weight: "bold",
      },
    },
    legend: {
      display: true,
      labels: {
        font: {
          family: "Poppins", // Set the Poppins font for the legend labels
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
          family: "Poppins", // Set the Poppins font for the tick labels
          size: 12,
        },
        callback: function (value) {
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

export const data = {
  labels,
  datasets: [
    {
      label: "Recycling Points Earned",
      data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
      fill: true,
      backgroundColor: "rgba(137, 226, 185, 0.4)",
      borderColor: "#2EB875",
      tension: 0.4,
      yAxisID: "y",
    },
  ],
};

export function ChartTest() {
  return <Line options={options} data={data} />;
}
