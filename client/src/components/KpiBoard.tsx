import type { Program } from "../types/types";

interface KpiProps {
  programs: Program[];
}

export const KpiBoard = ({ programs }: KpiProps) => {
  const plans = programs
    .map((program) => program.programData[0].dataValue)
    .reduce((sum, current) => sum + current);
  const facts = programs
    .map((program) => program.programData[1].dataValue)
    .reduce((sum, current) => sum + current);

  const generalPercent = Math.round((facts / plans) * 100);

  const generalRemainder = programs
    .map((program) => program.programData[3].dataValue)
    .reduce((sum, current) => sum + current);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Общее</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <h3>
          Общий процент выполнения: <span>{generalPercent} %</span>
        </h3>
        <h3>
          Общий остаток: <span>{generalRemainder}</span>
        </h3>
      </div>
    </div>
  );
};
