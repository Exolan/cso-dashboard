import type { Program } from "../types/types";
import BarPlanFactChart from "./BarPlanFactChart";

interface BarPlanFactProps {
  programs: Program[];
}

export const BarPlanFactBoard = ({ programs }: BarPlanFactProps) => {
  const labels = programs[0].programData
    .map((data) => data.dataName)
    .slice(0, 2);

  const colors = ["red", "blue", "orange", "green"];

  return (
    <div
      style={{
        width: "80vw",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>План vs Факт</h2>
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {programs.length !== 0 &&
          programs.map((program, index) => (
            <BarPlanFactChart
              key={index}
              labels={labels}
              program={program}
              color={colors[index]}
            />
          ))}
      </div>
    </div>
  );
};
