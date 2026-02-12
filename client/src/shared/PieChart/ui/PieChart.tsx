import { Pie } from "react-chartjs-2";
import type { Program } from "../../../app/types/types";
import ChartDataLabels, { type Context } from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, plugins, ChartDataLabels);

interface PieChartProps {
  program: Program;
}

export const PieChart = ({ program }: PieChartProps) => {
  const value = Math.round(program.programData[2].dataValue);
  const label = program.programName;

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Процент выполнения",
        color: "black" as const,
        font: {
          size: 18,
        },
      },
      datalabels: {
        display: true,
        color: "black",
        font: {
          size: 16,
          weight: "bold" as const,
        },
        formatter: (value: number, context: Context) => {
          // Показывать надпись ТОЛЬКО для первого сектора (Выполнено)
          if (context.dataIndex === 0) {
            return `${value}%`;
          }
          // Для второго сектора (Осталось) - пустая строка
          return "";
        },
      },
    },
  };

  const data = {
    labels: [`Выполнено (${value}%)`, `Осталось (${100 - value}%)`],
    datasets: [
      {
        label: label,
        data: [value, 100 - value],
        backgroundColor: ["#f4143f", "#f5edf0"],
        font: {
          weight: "bold",
          size: 20,
        },
      },
    ],
  };

  return <Pie data={data} options={options} />;
};
