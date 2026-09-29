import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

const DEFAULT_REPORT = [
  { roll: 'CS2023-001', name: 'Alex Rivera', lecturesHeld: 48, attended: 45, rate: 93.8 },
  { roll: 'CS2023-002', name: 'Sophia Patel', lecturesHeld: 48, attended: 46, rate: 95.8 },
  { roll: 'CS2023-003', name: 'Liam Vance', lecturesHeld: 48, attended: 41, rate: 85.4 },
  { roll: 'CS2023-004', name: 'Emma Watson', lecturesHeld: 48, attended: 32, rate: 66.7 },
  { roll: 'CS2023-005', name: 'Noah Hernandez', lecturesHeld: 48, attended: 43, rate: 89.6 },
  { roll: 'CS2023-006', name: 'Ava Montgomery', lecturesHeld: 48, attended: 39, rate: 81.3 },
  { roll: 'CS2023-007', name: 'Ethan Clark', lecturesHeld: 48, attended: 44, rate: 91.7 },
  { roll: 'CS2023-008', name: 'Olivia Bennett', lecturesHeld: 48, attended: 31, rate: 64.6 },
];

export const AttendanceReport = ({ reportData = DEFAULT_REPORT }) => {
  const lowAttendanceStudents = reportData.filter((s) => s.rate < 75);

  return (
    <div className="space-y-6">
      {/* Alert Banner for Low Attendance Students */}
      {lowAttendanceStudents.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900">Attendance Shortfall Warning</h4>
            <p className="mt-0.5 leading-relaxed text-amber-700">
              {lowAttendanceStudents.length} student(s) currently have less than 75% attendance.
              University regulations require attendance warning letters to be dispatched.
            </p>
          </div>
        </div>
      )}

      {/* Summary Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 font-['Outfit']">
            Cumulative Student Attendance Breakdown
          </h3>
          <span className="text-xs text-slate-500">Min. Exam Eligibility: 75%</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Held</th>
                <th className="py-3 px-4">Attended</th>
                <th className="py-3 px-4">Overall %</th>
                <th className="py-3 px-4 text-right">Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportData.map((s) => {
                const eligible = s.rate >= 75;
                return (
                  <tr key={s.roll} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 px-4 font-semibold text-slate-700">{s.roll}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{s.name}</td>
                    <td className="py-3 px-4 text-slate-500">{s.lecturesHeld}</td>
                    <td className="py-3 px-4 font-semibold text-slate-700">{s.attended}</td>
                    <td className="py-3 px-4 font-bold">
                      <span className={eligible ? 'text-emerald-600' : 'text-rose-600'}>
                        {s.rate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          eligible ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {eligible ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        )}
                        {eligible ? 'Eligible for Exams' : 'Shortfall (Ineligible)'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
