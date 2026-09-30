import React, { useState } from 'react';
import { Check, X, Users, Calendar, Save, CheckCircle2 } from 'lucide-react';

const INITIAL_ROSTER = [
  { id: 'std_1', rollNumber: 'CS2023-001', name: 'Alex Rivera', isPresent: true },
  { id: 'std_2', rollNumber: 'CS2023-002', name: 'Sophia Patel', isPresent: true },
  { id: 'std_3', rollNumber: 'CS2023-003', name: 'Liam Vance', isPresent: true },
  { id: 'std_4', rollNumber: 'CS2023-004', name: 'Emma Watson', isPresent: false },
  { id: 'std_5', rollNumber: 'CS2023-005', name: 'Noah Hernandez', isPresent: true },
  { id: 'std_6', rollNumber: 'CS2023-006', name: 'Ava Montgomery', isPresent: true },
  { id: 'std_7', rollNumber: 'CS2023-007', name: 'Ethan Clark', isPresent: true },
  { id: 'std_8', rollNumber: 'CS2023-008', name: 'Olivia Bennett', isPresent: false },
];

export const MarkAttendance = ({ onSaveAttendance }) => {
  const [course, setCourse] = useState('CS301');
  const [subject, setSubject] = useState('Data Structures & Algorithms');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [roster, setRoster] = useState(INITIAL_ROSTER);
  const [submitted, setSubmitted] = useState(false);

  const toggleStudent = (id) => {
    setRoster((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isPresent: !s.isPresent } : s))
    );
  };

  const markAll = (status) => {
    setRoster((prev) => prev.map((s) => ({ ...s, isPresent: status })));
  };

  const presentCount = roster.filter((s) => s.isPresent).length;
  const percentage = ((presentCount / roster.length) * 100).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const record = {
      course,
      subject,
      date,
      totalStudents: roster.length,
      presentCount,
      percentage: parseFloat(percentage),
      roster,
    };
    if (onSaveAttendance) {
      onSaveAttendance(record);
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-800 font-['Outfit']">
            Daily Attendance Roster
          </h3>
          <p className="text-xs text-slate-500">
            Select subject, class section, and toggle student presence.
          </p>
        </div>

        {/* Live Attendance Stats */}
        <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Present</span>
            <span className="text-sm font-bold text-slate-900">
              {presentCount} / {roster.length}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Ratio</span>
            <span
              className={`text-sm font-bold ${
                parseFloat(percentage) >= 75 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      {submitted && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Attendance recorded successfully! Records archived to institutional registry.</span>
        </div>
      )}

      {/* Class & Date Selector */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Class Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="input-field text-xs py-2"
            >
              <option value="CS301">CS301 - Year 3 CSE</option>
              <option value="CS402">CS402 - Year 4 CSE</option>
              <option value="EE201">EE201 - Year 2 ECE</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Lecture Subject
            </label>
            <input
              type="text"
              readOnly
              value={subject}
              className="input-field text-xs py-2 bg-slate-50 text-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Lecture Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field text-xs py-2"
            />
          </div>
        </div>

        {/* Quick Batch Controls */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-semibold text-slate-700">Enrolled Student Roster</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => markAll(true)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
            >
              All Present
            </button>
            <button
              type="button"
              onClick={() => markAll(false)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition"
            >
              All Absent
            </button>
          </div>
        </div>

        {/* Student Roster List */}
        <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden bg-white">
          {roster.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{student.name}</h4>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {student.rollNumber}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleStudent(student.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  student.isPresent
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}
              >
                {student.isPresent ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Present
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5" /> Absent
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="btn-primary text-xs">
            <Save className="w-4 h-4" /> Save &amp; Submit Attendance
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarkAttendance;
