import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import type { DashboardData } from "./types/types";
import { BarPlanFactBoard } from "./components/BarPlanFactBoard";
import { KpiBoard } from "./components/KPIBoard";
import { PiePercentBoard } from "./components/PiePercentBoard";

function App() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/get_data");
        console.log(res.data);
        setDashboardData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  if (!dashboardData) return <span>Загрузка...</span>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>{dashboardData.title}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <KpiBoard programs={dashboardData.programs} />
        <BarPlanFactBoard programs={dashboardData.programs} />
        <PiePercentBoard programs={dashboardData.programs} />
      </div>
    </div>
  );
}

export default App;
