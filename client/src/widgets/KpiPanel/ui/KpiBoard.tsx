import type { Program } from "../../../app/types/types";
import styles from "./KpiBoard.module.scss";

interface KpiProps {
  programs: Program[];
}

const KpiBoard = ({ programs }: KpiProps) => {
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
    <div className={styles.board}>
      <h2 className={styles.boardTitle}>Общее</h2>
      <div className={styles.boardMetrics}>
        <h3 className={styles.metricText}>
          Общий процент выполнения:{" "}
          <span className={styles.metricValue}>{generalPercent} %</span>
        </h3>
        <h3 className={styles.metricText}>
          Общий остаток:{" "}
          <span className={styles.metricValue}>{generalRemainder}</span>
        </h3>
      </div>
    </div>
  );
};

export default KpiBoard;
