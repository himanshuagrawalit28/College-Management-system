import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';
import StatCard from '../../components/dashboard/StatCard';
import {
  GraduationCap,
  CalendarCheck,
  Award,
  CreditCard,
  Clock,
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Bell,
  BookOpen,
} from 'lucide-react';

const TODAY_CLASSES = [
  { time: '09:00 - 10:30 AM', subject: 'CS301: Data Structures', room: 'Lecture Hall 101', faculty: 'Prof. Sarah Jenkins', status: 'Completed' },
  { time: '10:45 - 12:15 PM', subject: 'CS303: Operating Systems', room: 'Lecture Hall 202', faculty: 'Dr. Elena Rostova', status: 'Upcoming' },
  { time: '01:30 - 03:00 PM', subject: 'CS304: Database Systems', room: 'Computing Lab 3', faculty: 'Prof. Mark Davis', status: 'Upcoming' },
];

export const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-card p-6 sm:p-8 bg-gradient-to-r from-teal-950 via-emerald-900 to-slate-900 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" /> Student Self-Service Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
              Welcome back, {user?.name || 'Alex Rivera'}!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              Roll No: {user?.rollNumber || 'CS2023-018'} &bull; {user?.semester || '6th Semester'} &bull;{' '}
              {user?.department || 'Department of Computer Science'}. You are in good academic standing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={ROUTES.STUDENT_ATTENDANCE}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-emerald-950 hover:bg-emerald-50 transition shadow-sm"
            >
              <CalendarCheck className="w-3.5 h-3.5" /> Check Attendance
            </Link>
            <Link
              to={ROUTES.STUDENT_RESULTS}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
            >
              <Award className="w-3.5 h-3.5" /> View Results
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Current CGPA"
          value={user?.cgpa ? String(user.cgpa) : '3.84'}
          change="Top 5% in Department"
          isPositive={true}
          icon={Award}
          color="emerald"
        />
        <StatCard
          title="Attendance Rate"
          value={`${user?.attendanceRate || 92}%`}
          change="Eligible for final exams (>75%)"
          isPositive={true}
          icon={CalendarCheck}
          color="indigo"
        />
        <StatCard
          title="Fee Status"
          value="Cleared ($0)"
          change="Autumn semester balance paid"
          isPositive={true}
          icon={CreditCard}
          color="emerald"
        />
        <StatCard
          title="Enrolled Subjects"
          value="5 Subjects"
          change="24 Credit Units"
          isPositive={true}
          icon={BookOpen}
          color="purple"
        />
      </div>

      {/* Schedule & Quick Links Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Lectures */}
        <div className="lg:col-span-7 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 font-['Outfit']">
                Today's Class Schedule
              </h3>
              <p className="text-xs text-slate-500">Lectures and practical sessions scheduled today</p>
            </div>
            <Link to={ROUTES.STUDENT_TIMETABLE} className="text-xs font-semibold text-emerald-700 hover:underline">
              Full Timetable &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {TODAY_CLASSES.map((cls, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{cls.subject}</h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {cls.room} &bull; {cls.faculty}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 block">{cls.time}</span>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                      cls.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {cls.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 font-['Outfit'] mb-1">
              Student Quick Access
            </h3>
            <p className="text-xs text-slate-500 mb-4">Direct portals to student records and services.</p>

            <div className="space-y-2.5">
              <Link
                to={ROUTES.STUDENT_ATTENDANCE}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-200 transition"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  <span>Subject-wise Attendance Roster</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to={ROUTES.STUDENT_RESULTS}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-200 transition"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Semester Exam Marks &amp; Transcripts</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to={ROUTES.STUDENT_FEES}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-200 transition"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Tuition Invoices &amp; Receipts</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to={ROUTES.STUDENT_NOTICES}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-200 transition"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <Bell className="w-4 h-4 text-emerald-600" />
                  <span>Official Campus Circulars</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 text-xs text-emerald-950">
            <span className="font-bold block mb-0.5">Exam Eligibility Verified</span>
            Your current attendance rate is 92%. You have met the institutional requirement for end-term exams.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
