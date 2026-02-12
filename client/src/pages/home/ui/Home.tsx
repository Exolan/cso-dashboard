import { useState, useEffect, useMemo } from "react";
import type { DashboardData } from "../../../app/types/types";
import { fetchData } from "../api/fetchData";
import DashboardWidget from "../../../widgets/DashboardPanel";
import DropdownWidget from "../../../widgets/DropdownPanel";

import styles from "./Home.module.scss";

function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setDashboardData(data);
    };

    getData();
  }, []);

  const dashboardPrograms = useMemo(
    () =>
      dashboardData?.programs.filter((_, index) => [0, 2, 3].includes(index)) ??
      [],
    [dashboardData],
  );

  const dropdownPrograms = useMemo(
    () => dashboardData?.programs.filter((_, index) => index === 1) ?? [],
    [dashboardData],
  );

  if (!dashboardData) return <span>Загрузка...</span>;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>{dashboardData.title}</h1>
      </header>
      <div className={styles.conteiner}>
        <DashboardWidget programs={dashboardPrograms} />
        <DropdownWidget programs={dropdownPrograms} />
      </div>
    </div>
  );
}

export default Home;
