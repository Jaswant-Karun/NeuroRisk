import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function BarChartBox({ signals }) {
  if (!signals) return null;

  const data = [
    { name: "Focus", v: signals.focus_difficulty },
    { name: "Exhaustion", v: signals.mental_exhaustion },
    { name: "Sleep", v: signals.sleep_disruption },
    { name: "Workload", v: signals.workload },
    { name: "Emotion", v: signals.emotional_friction }
  ];

  return (
    <div className="chart-card">
      <h4>Stress Signal Breakdown</h4>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 2]} />
          <Tooltip />
          <Bar dataKey="v" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
