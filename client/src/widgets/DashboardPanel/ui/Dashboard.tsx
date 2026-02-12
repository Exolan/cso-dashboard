import type { Program } from "../../../app/types/types";
import BarChart from "../../../shared/BarChart";
import PieChart from "../../../shared/PieChart";

import styles from "./Dashboard.module.scss";

interface DashboardProps {
  programs: Program[];
}

const Dashboard = ({ programs }: DashboardProps) => {
  return (
    <div className={styles.dashboard}>
      {programs.map((program) => {
        if (program.programName !== "Проф.переподготовка") {
          return (
            <div key={program.programName} className={styles.dashboardBlock}>
              <header className={styles.dashboardHeader}>
                <h3>{program.programName}</h3>
              </header>
              <div className={styles.chartsConteiner}>
                <div className={styles.chart}>
                  <BarChart
                    program={program}
                    unit={program.programName === "ППК" ? "чел/ч" : "шт"}
                  />
                </div>
                <div className={styles.chart}>
                  <PieChart program={program} />
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Dashboard;
