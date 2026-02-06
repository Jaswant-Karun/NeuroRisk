export default function MetricCard({ title, value, percent, color }) {
  return (
    <div className={`metric-card ${color}`}>
      <p>{title}</p>
      <h2>{value}</h2>

      <div className="progress">
        <div style={{ width: percent }} />
      </div>

      <span>{percent} Target</span>
    </div>
  );
}
