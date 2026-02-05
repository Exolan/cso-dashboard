import type { Program } from "../types/types";
import { PiePercentChart } from "./PiePercentChart";

interface PiePercentBoardProps {
  programs: Program[];
}

export const PiePercentBoard = ({ programs }: PiePercentBoardProps) => {
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
      <h2>Процент выполнения</h2>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
        }}
      >
        {programs.map((program, index) => (
          <PiePercentChart key={index} program={program} />
        ))}
      </div>
    </div>
  );
};
