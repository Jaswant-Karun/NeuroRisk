import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function DonutChartBox({ label, value, color }) {
    return (
        <div className="donut-card">
            <div style={{ width: '100%', height: 140 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={[{ value }, { value: 100 - value }]}
                            dataKey="value"
                            innerRadius={45}
                            outerRadius={60}
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                        >
                            <Cell fill={color} />
                            <Cell fill="#f3f4f6" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <h4 className="percent" style={{ color: color }}>{value}%</h4>
            <p>{label}</p>
        </div>
    );
}
