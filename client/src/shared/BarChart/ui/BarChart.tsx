import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import type { Program } from "../../../app/types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Tooltip, // Для подсказок при наведении
);

interface BarChartProps {
  program: Program;
  unit: string;
}

const BarChart = ({ program, unit }: BarChartProps) => {
  const remainder = program.programData[3].dataValue;

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: "black",
          font: {
            size: 16,
          },
        },
      },
      x: {
        ticks: {
          color: "black",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Остаток: ${remainder} ${unit}`,
        color: "black",
        font: {
          weight: "bold",
          size: 20,
        },
      },
      legend: {
        display: false,
        position: "top" as const,
      },
      datalabels: {
        formatter: (value: number) => `${value.toLocaleString()} ${unit}`,
        font: {
          weight: "bold",
          size: 20,
        },
        color: "black",
      },
    },
  };

  const values = program.programData.map((data) => data.dataValue).slice(0, 2);

  const label = program.programName;

  const data = {
    labels: ["План", "Факт"],

    datasets: [
      {
        label: label,
        data: values,
        borderWidth: 1,
        backgroundColor: ["#f4143f", "#edb217"],
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
