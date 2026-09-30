import React from 'react';
import Timetable from '../../components/academics/Timetable';
import { Clock, MapPin, Calendar, Sparkles } from 'lucide-react';

const FACULTY_WEEKLY_SCHEDULE = [
  {
    time: '09:00 - 10:30 AM',
    mon: { subject: 'CS301: Data Structures', room: 'LH-101', faculty: 'Section A (45 Students)' },
    tue: null,
    wed: { subject: 'CS301: Data Structures', room: 'LH-101', faculty: 'Section A (45 Students)' },
    thu: null,
    fri: null,
  },
  {
    time: '10:45 - 12:15 PM',
    mon: null,
    tue: { subject: 'CS402: Cloud Architecture', room: 'LH-104', faculty: 'Section B (38 Students)' },
    wed: null,
    thu: { subject: 'CS301: Data Structures Lab', room: 'Computing Lab 1', faculty: 'Lab Batch 1' },
    fri: { subject: 'CS402: Cloud Architecture', room: 'LH-104', faculty: 'Section B (38 Students)' },
  },
  {
    time: '01:30 - 03:00 PM',
    mon: null,
    tue: { subject: 'CS301: Office Mentorship', room: 'Cabin 304', faculty: 'Student Office Hours' },
    wed: null,
    thu: null,
    fri: { subject: 'Department Faculty Meeting', room: 'Board Room', faculty: 'CSE Department' },
  },
];

export const FacultyTimetable = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Teaching Timetable &amp; Office Hours
          </h1>
          <p className="text-xs text-slate-500">
            Assigned lecture slots, lab practical sessions, and student advisory hours.
          </p>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Total Weekly Hours</span>
            <span className="text-base font-bold text-slate-800">14 Teaching Hours</span>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Faculty Cabin</span>
            <span className="text-base font-bold text-slate-800">Room 304, Tech Wing</span>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Office Hours</span>
            <span className="text-base font-bold text-slate-800">Tue &amp; Thu: 1:30 - 3:00 PM</span>
          </div>
        </div>
      </div>

      {/* Matrix */}
      <Timetable schedule={FACULTY_WEEKLY_SCHEDULE} />
    </div>
  );
};

export default FacultyTimetable;
