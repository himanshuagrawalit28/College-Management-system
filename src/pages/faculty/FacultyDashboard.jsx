import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';
import StatCard from '../../components/dashboard/StatCard';
import AttendanceChart from '../../components/dashboard/AttendanceChart';
import {
  BookOpen,
  Users,
  CalendarCheck,
  Clock,
  Sparkles,
  Award,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

const TODAY_CLASSES = [
  { time: '09:00 - 10:30 AM', subject: 'CS301: Data Structures', room: 'Lecture Hall 101', count: 45, status: 'Completed' },
  { time: '11:00 - 12:30 PM', subject: 'CS402: Cloud Architecture', room: 'Lecture Hall 104', count: 38, status: 'Upcoming' },
  { time: '02:00 - 04:00 PM', subject: 'CS301: DS Algorithm Lab', room: 'Computing Lab 1', count: 22, status: 'Upcoming' },
];

export const FacultyDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-card p-6 sm:p-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-200 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" /> Faculty Academic Studio
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
              Welcome, {user?.name || 'Prof. Sarah Jenkins'}!
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-xl">
              {user?.designation || 'Associate Professor'} &bull; Department of{' '}
              {user?.department || 'Computer Science & Engineering'}. You have 2 lectures scheduled
              today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={ROUTES.FACULTY_ATTENDANCE}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-amber-950 hover:bg-amber-50 transition shadow-sm"
            >
              <CalendarCheck className="w-3.5 h-3.5" /> Mark Class Attendance
            </Link>
            <Link
              to={ROUTES.FACULTY_RESULTS}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
            >
              <Award className="w-3.5 h-3.5" /> Enter Exam Grades
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Assigned Subjects"
          value="2 Courses"
          change="CS301 & CS402"
          isPositive={true}
          icon={BookOpen}
          color="amber"
        />
        <StatCard
          title="Enrolled Students"
          value="83"
          change="Sections A & B"
          isPositive={true}
          icon={Users}
          color="indigo"
        />
        <StatCard
          title="Average Attendance"
          value="92.8%"
          change="↑ +3.2% vs last term"
          isPositive={true}
          icon={CalendarCheck}
          color="emerald"
        />
        <StatCard
          title="Today's Lectures"
          value="3 Sessions"
          change="Next at 11:00 AM"
          isPositive={true}
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Schedule & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-7 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 font-['Outfit']">
                Today's Teaching Schedule
              </h3>
              <p className="text-xs text-slate-500">Scheduled classroom lectures and lab batches</p>
            </div>
            <Link to={ROUTES.FACULTY_TIMETABLE} className="text-xs font-semibold text-amber-700 hover:underline">
              View Week &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {TODAY_CLASSES.map((cls, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{cls.subject}</h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {cls.room} &bull; {cls.count} Enrolled
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 block">{cls.time}</span>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                      cls.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {cls.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Short-cuts */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 font-['Outfit'] mb-1">
              Faculty Quick Navigation
            </h3>
            <p className="text-xs text-slate-500 mb-4">Direct shortcuts to frequent teaching duties.</p>

            <div className="space-y-2.5">
              <Link
                to={ROUTES.FACULTY_ATTENDANCE}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-amber-50/50 hover:border-amber-200 transition"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <CalendarCheck className="w-4 h-4 text-amber-600" />
                  <span>Mark Lecture Attendance</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to={ROUTES.FACULTY_RESULTS}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-amber-50/50 hover:border-amber-200 transition"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Upload Semester Marks</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to={ROUTES.FACULTY_PROFILE}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-amber-50/50 hover:border-amber-200 transition"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>Academic Credentials Profile</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900">
            <span className="font-bold block mb-0.5">Examination Notice</span>
            Mid-term marks submission deadline is Friday, Oct 25th at 05:00 PM.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
