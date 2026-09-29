import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const DEFAULT_DATA = [
  { day: 'Mon', attendance: 92, target: 85 },
  { day: 'Tue', attendance: 95, target: 85 },
  { day: 'Wed', attendance: 88, target: 85 },
  { day: 'Thu', attendance: 91, target: 85 },
  { day: 'Fri', attendance: 86, target: 85 },
  { day: 'Sat', attendance: 89, target: 85 },
];

export const AttendanceChart = ({ data = DEFAULT_DATA, title = 'Weekly Campus Attendance' }) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 font-['Outfit']">{title}</h3>
          <p className="text-xs text-slate-500">Student daily physical & digital presence rate (%)</p>
        </div>
        <span className="badge-success">Avg: 90.2%</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis
              domain={[60, 100]}
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
              formatter={(value) => [`${value}%`, 'Attendance']}
            />
            <Bar
              dataKey="attendance"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
