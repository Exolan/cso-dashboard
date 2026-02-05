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
  Colors,
  type ChartOptions,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

import { Bar } from "react-chartjs-2";
import type { Program } from "../types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  ChartDataLabels,
);

interface BarPlanFactChartProps {
  labels: Array<string>;
  program: Program;
  color: string;
}

const BarPlanFactChart = ({
  labels,
  program,
  color,
}: BarPlanFactChartProps) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
      colors: {
        enabled: true,
      },
      datalabels: {
        color: "#000",
        anchor: "center", // или 'center', 'start'
        align: "top", // или 'bottom', 'center'
        formatter: (value: number) => value.toLocaleString(),
        font: {
          weight: "bold",
          size: 12,
        },
      },
    },
  };

  const values = program.programData.map((data) => data.dataValue).slice(0, 2);

  const label = program.programName;

  const data = {
    labels: labels,
    datasets: [{ label: label, data: values, backgroundColor: color }],
  };

  return <Bar options={options} data={data} />;
};

export default BarPlanFactChart;
