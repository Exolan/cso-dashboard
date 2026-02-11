import { useState, useEffect } from "react";
import type { DashboardData } from "../../../app/types/types";
import { fetchData } from "../api/fetchData";
import KpiBoard from "../../../widgets/KpiPanel";
import DashboardWidget from "../../../widgets/DashboardPanel";

import styles from "./Home.module.scss";

function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setDashboardData(data);
      console.log(data);
    };

    getData();
  }, []);

  if (!dashboardData) return <span>Загрузка...</span>;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>{dashboardData.title}</h1>
      </header>
      <div className={styles.conteiner}>
        <KpiBoard programs={dashboardData.programs} />
        <DashboardWidget programs={dashboardData.programs} />
      </div>
    </div>
  );
}

export default Home;
