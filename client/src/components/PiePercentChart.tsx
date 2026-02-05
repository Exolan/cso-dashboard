import { Pie } from "react-chartjs-2";
import type { Program } from "../types/types";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PiePercentChartProps {
  program: Program;
}

export const PiePercentChart = ({ program }: PiePercentChartProps) => {
  const value = Math.round(program.programData[2].dataValue);
  const label = program.programName;

  const data = {
    labels: [label],
    datasets: [
      {
        label: label,
        data: [value, 100 - value],
      },
    ],
  };

  return <Pie data={data} />;
};
