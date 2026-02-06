import { useEffect, useState } from "react";
import MetricCard from "../components/cards/MetricCard";
import LineChartBox from "../components/charts/LineChart";
import BarChartBox from "../components/charts/BarChart";
import DonutChartBox from "../components/charts/DonutChart";
import { fetchRiskStatus } from "../services/api";

export default function Dashboard() {
  const [riskStatus, setRiskStatus] = useState(null);

  useEffect(() => {
    fetchRiskStatus().then((data) => {
      setRiskStatus(data);
    });
  }, []);

  return (
    <div className="dashboard">

      {/* TOP METRICS */}
      <h2 style={{ marginBottom: "10px", color: "#1f2937" }}>
        Overview
      </h2>

      <div className="metric-grid">
        <MetricCard
          title="Current Risk Level"
          value={riskStatus?.risk_level ?? "--"}
          percent="100%"
          color="red"
        />

        <MetricCard
          title="Risk Score"
          value={riskStatus ? riskStatus.risk_score : "--"}
          percent="80%"
          color="blue"
        />

        <MetricCard
          title="Persistence Days"
          value={
            riskStatus ? `${riskStatus.persistence_days} Days` : "--"
          }
          percent="60%"
          color="purple"
        />

        <MetricCard
          title="Today's Stress Load"
          value={
            riskStatus ? `${riskStatus.today_score} / 10` : "--"
          }
          percent="80%"
          color="green"
        />
      </div>

      {/* CENTER GRID (UNCHANGED FOR NOW) */}
      <div className="dashboard-grid">

        <div className="big-chart">
          <LineChartBox />
        </div>

        <div className="side-donuts">
          {/* <h4 style={{ margin: "0 0 10px 0", color: "#4b5563" }}>
            Risk Distribution
          </h4> */}
<div className="side-donuts">
  <h4 style={{ margin: "0 0 10px 0", color: "#4b5563" }}>
    Risk Distribution
  </h4>

  <DonutChartBox
    label="Low Risk Zone"
    value={riskStatus ? Math.max(0, 100 - riskStatus.risk_score * 10) : 0}
    color="#22c55e"
  />

  <DonutChartBox
    label="Medium Warning"
    value={riskStatus ? riskStatus.risk_score * 5 : 0}
    color="#facc15"
  />

  <DonutChartBox
    label="Critical High"
    value={riskStatus ? riskStatus.risk_score * 5 : 0}
    color="#ef4444"
  />
</div>

        </div>

        <div className="bar-chart">
          <div style={{ marginTop: "20px" }}>
<BarChartBox signals={riskStatus?.signals} />

          </div>
        </div>

      </div>
    </div>
  );
}
