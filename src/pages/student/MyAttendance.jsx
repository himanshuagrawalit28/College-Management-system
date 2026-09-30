import React from 'react';
import { CalendarCheck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const SUBJECT_ATTENDANCE = [
  { code: 'CS301', name: 'Data Structures & Algorithms', faculty: 'Prof. Sarah Jenkins', held: 48, attended: 45, percentage: 93.8 },
  { code: 'CS302', name: 'Computer Networks & Protocols', faculty: 'Dr. Arthur Pendelton', held: 40, attended: 38, percentage: 95.0 },
  { code: 'CS303', name: 'Operating Systems Internals', faculty: 'Dr. Elena Rostova', held: 45, attended: 40, percentage: 88.9 },
  { code: 'CS304', name: 'Relational & NoSQL Database Systems', faculty: 'Prof. Mark Davis', held: 40, attended: 36, percentage: 90.0 },
  { code: 'CS305', name: 'Software Engineering Methodologies', faculty: 'Dr. Arthur Pendelton', held: 32, attended: 30, percentage: 93.8 },
];

const RECENT_SESSIONS = [
  { date: '2026-09-28', subject: 'CS301: Data Structures', time: '09:00 - 10:30 AM', status: 'Present' },
  { date: '2026-09-27', subject: 'CS303: Operating Systems', time: '10:45 - 12:15 PM', status: 'Present' },
  { date: '2026-09-26', subject: 'CS304: Database Systems', time: '01:30 - 03:00 PM', status: 'Present' },
  { date: '2026-09-25', subject: 'CS302: Computer Networks', time: '10:45 - 12:15 PM', status: 'Present' },
  { date: '2026-09-24', subject: 'CS305: Software Engineering', time: '09:00 - 10:30 AM', status: 'Absent' },
];

export const MyAttendance = () => {
  const totalHeld = SUBJECT_ATTENDANCE.reduce((sum, s) => sum + s.held, 0);
  const totalAttended = SUBJECT_ATTENDANCE.reduce((sum, s) => sum + s.attended, 0);
  const overallRate = ((totalAttended / totalHeld) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            My Attendance Record
          </h1>
          <p className="text-xs text-slate-500">
            Subject-wise attendance breakdown, minimum 75% examination compliance tracker.
          </p>
        </div>
      </div>

      {/* Overview Metric Banner */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-50/80 to-indigo-50/50 border border-emerald-200/60">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-lg shadow-emerald-200">
            {overallRate}%
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
              Overall Academic Attendance Rate
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Attended {totalAttended} of {totalHeld} scheduled class lectures and lab sessions.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-1">
              <CheckCircle className="w-4 h-4" /> Eligible for End-Semester Examinations (&gt; 75%)
            </span>
          </div>
        </div>
      </div>

      {/* Subject-Wise Attendance Cards */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 font-['Outfit']">
            Subject-wise Attendance Distribution
          </h3>
          <span className="badge-primary">5 Enrolled Courses</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Faculty Mentor</th>
                <th className="py-3 px-4">Held</th>
                <th className="py-3 px-4">Attended</th>
                <th className="py-3 px-4">Compliance Gauge</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SUBJECT_ATTENDANCE.map((sub) => {
                const isCompliant = sub.percentage >= 75;
                return (
                  <tr key={sub.code} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block text-xs">{sub.name}</span>
                      <span className="text-[11px] font-semibold text-indigo-600">{sub.code}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{sub.faculty}</td>
                    <td className="py-3.5 px-4 text-slate-500">{sub.held}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{sub.attended}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isCompliant ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${sub.percentage}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800 text-xs">{sub.percentage}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          isCompliant ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {isCompliant ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        )}
                        {isCompliant ? 'Eligible' : 'At Risk'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Lecture History */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 font-['Outfit']">
            Recent Class Roll Calls
          </h3>
          <span className="text-xs text-slate-400">Past 5 sessions</span>
        </div>

        <div className="divide-y divide-slate-100">
          {RECENT_SESSIONS.map((sess, idx) => (
            <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    sess.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{sess.subject}</h4>
                  <span className="text-[11px] text-slate-400">
                    {sess.date} &bull; {sess.time}
                  </span>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  sess.status === 'Present'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {sess.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;
