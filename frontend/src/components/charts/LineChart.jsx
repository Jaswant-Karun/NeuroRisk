import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { fetchRiskHistory } from "../../services/api";

export default function LineChartBox() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRiskHistory().then(setData);
  }, []);

  return (
    <div className="chart-card">
      <h4>Risk Trend Over Time</h4>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="dailyScore"
            name="Daily Stress Score"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="baseline"
            name="Baseline"
            stroke="#64748b"
            strokeDasharray="5 5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
