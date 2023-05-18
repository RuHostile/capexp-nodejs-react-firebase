import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = (statusData) => {
  let data = {
    labels: [
      "Complete",
      "In progress",
      "Not started",
      "Postponed",
      "Business case",
    ],
    datasets: [
      {
        label: "Amount",
        data: [
          statusData.statusData[0],
          statusData.statusData[1],
          statusData.statusData[2],
          statusData.statusData[3],
          statusData.statusData[4],
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderColor: ["rgba(0, 0, 0, 0"],

        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};
