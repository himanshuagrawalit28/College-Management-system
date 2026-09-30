import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';

const DEFAULT_SCHEDULE = [
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

export const Timetable = ({ schedule = DEFAULT_SCHEDULE }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri'];

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold uppercase">
              <th className="py-3.5 px-4 w-36">Time Slot</th>
              {days.map((day) => (
                <th key={day} className="py-3.5 px-4 text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {schedule.map((slot, idx) => (
              <tr key={idx} className="hover:bg-slate-50/40 transition">
                <td className="py-4 px-4 font-bold text-slate-700 bg-slate-50/50">
                  <div className="flex items-center gap-1.5 text-indigo-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot.time}</span>
                  </div>
                </td>
                {dayKeys.map((key) => {
                  const entry = slot[key];
                  return (
                    <td key={key} className="py-3 px-3 text-center">
                      {entry ? (
                        <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 hover:border-indigo-300 transition text-left space-y-1">
                          <p className="font-bold text-slate-900 text-xs truncate">
                            {entry.subject}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-rose-500" />
                              {entry.room}
                            </span>
                            <span className="truncate max-w-[90px]">{entry.faculty}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-300 text-xs">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
