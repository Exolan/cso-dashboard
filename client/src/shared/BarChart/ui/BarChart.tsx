import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

import { Bar } from "react-chartjs-2";
import type { Program } from "../../../app/types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

interface BarChartProps {
  program: Program;
}

const BarChart = ({ program }: BarChartProps) => {
  const options: ChartOptions<"bar"> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      datalabels: {
        formatter: (value: number) => value.toLocaleString(),
        font: {
          weight: "bold",
          size: 20,
        },
      },
    },
  };

  const values = program.programData.map((data) => data.dataValue).slice(0, 2);

  const label = program.programName;

  const data = {
    labels: ["План", "Факт"],
    datasets: [{ label: label, data: values }],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
