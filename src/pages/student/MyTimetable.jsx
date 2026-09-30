import React from 'react';
import Timetable from '../../components/academics/Timetable';
import { Clock, MapPin, Calendar, Sparkles } from 'lucide-react';

const STUDENT_WEEKLY_SCHEDULE = [
  {
    time: '09:00 - 10:30 AM',
    mon: { subject: 'CS301: Data Structures', room: 'LH-101', faculty: 'Prof. Sarah Jenkins' },
    tue: { subject: 'CS302: Computer Networks', room: 'LH-104', faculty: 'Dr. Arthur Pendelton' },
    wed: { subject: 'CS301: Data Structures', room: 'LH-101', faculty: 'Prof. Sarah Jenkins' },
    thu: { subject: 'CS303: Operating Systems', room: 'LH-202', faculty: 'Dr. Elena Rostova' },
    fri: { subject: 'CS304: Database Systems', room: 'Lab 3', faculty: 'Prof. Mark Davis' },
  },
  {
    time: '10:45 - 12:15 PM',
    mon: { subject: 'CS303: Operating Systems', room: 'LH-202', faculty: 'Dr. Elena Rostova' },
    tue: { subject: 'CS304: Database Systems', room: 'LH-102', faculty: 'Prof. Mark Davis' },
    wed: { subject: 'CS302: Computer Networks', room: 'LH-104', faculty: 'Dr. Arthur Pendelton' },
    thu: { subject: 'CS301: DS Algorithm Lab', room: 'Computing Lab 1', faculty: 'Prof. Sarah Jenkins' },
    fri: { subject: 'CS305: Software Engineering', room: 'LH-105', faculty: 'Dr. Arthur Pendelton' },
  },
  {
    time: '01:30 - 03:00 PM',
    mon: { subject: 'CS304: Database Systems', room: 'LH-102', faculty: 'Prof. Mark Davis' },
    tue: { subject: 'CS301: Data Structures', room: 'LH-101', faculty: 'Prof. Sarah Jenkins' },
    wed: { subject: 'CS305: Software Engineering', room: 'LH-105', faculty: 'Dr. Arthur Pendelton' },
    thu: { subject: 'CS302: Computer Networks', room: 'LH-104', faculty: 'Dr. Arthur Pendelton' },
    fri: { subject: 'CS306: Machine Learning Seminar', room: 'Auditorium', faculty: 'Dr. Elena Rostova' },
  },
];

export const MyTimetable = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            My Academic Schedule &amp; Lecture Halls
          </h1>
          <p className="text-xs text-slate-500">
            Weekly classes, laboratory timings, and faculty room locations for 6th Semester.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Weekly Contact Hours</span>
            <span className="text-base font-bold text-slate-800">22 Hours / Week</span>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Primary Department</span>
            <span className="text-base font-bold text-slate-800">Computer Science Block</span>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Semester Status</span>
            <span className="text-base font-bold text-slate-800">Week 7 in Progress</span>
          </div>
        </div>
      </div>

      <Timetable schedule={STUDENT_WEEKLY_SCHEDULE} />
    </div>
  );
};

export default MyTimetable;
