import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const DEFAULT_PERFORMANCE_DATA = [
  { term: 'Sem 1', avgGpa: 3.42, topScore: 3.95 },
  { term: 'Sem 2', avgGpa: 3.51, topScore: 4.0 },
  { term: 'Sem 3', avgGpa: 3.58, topScore: 3.98 },
  { term: 'Sem 4', avgGpa: 3.65, topScore: 4.0 },
  { term: 'Sem 5', avgGpa: 3.72, topScore: 4.0 },
  { term: 'Sem 6', avgGpa: 3.78, topScore: 4.0 },
];

export const PerformanceChart = ({
  data = DEFAULT_PERFORMANCE_DATA,
  title = 'Academic Performance Trends',
}) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 font-['Outfit']">{title}</h3>
          <p className="text-xs text-slate-500">Cumulative GPA trends across semesters</p>
        </div>
        <span className="badge-primary">Highest GPA: 4.0</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="term"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis
              domain={[2.5, 4.0]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                fontSize: '12px',
              }}
              formatter={(value) => [`${value} GPA`, 'Average Score']}
            />
            <Area
              type="monotone"
              dataKey="avgGpa"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorGpa)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
