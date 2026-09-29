import React from 'react';
import { formatDate } from '../../utils/helpers';
import { Calendar, Users, CheckCircle2, AlertTriangle } from 'lucide-react';

export const AttendanceTable = ({ records }) => {
  if (!records || records.length === 0) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm">
        No attendance sessions logged yet.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 font-['Outfit']">
          Past Lecture Attendance Logs
        </h3>
        <span className="badge-primary">Semester Archive</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Present</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Percentage</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((rec) => {
              const isGood = rec.percentage >= 80;
              return (
                <tr key={rec.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {formatDate(rec.date)}
                  </td>
                  <td className="py-3 px-4 font-bold text-indigo-600">{rec.course}</td>
                  <td className="py-3 px-4 text-slate-700">{rec.subject}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">{rec.presentCount}</td>
                  <td className="py-3 px-4 text-slate-500">{rec.totalStudents}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isGood ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${rec.percentage}%` }}
                        />
                      </div>
                      <span className="font-semibold text-slate-800">{rec.percentage}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        isGood ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {isGood ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                      {isGood ? 'Optimal' : 'Low Turnout'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
