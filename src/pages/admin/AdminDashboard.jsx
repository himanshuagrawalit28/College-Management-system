import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';
import StatCard from '../../components/dashboard/StatCard';
import AttendanceChart from '../../components/dashboard/AttendanceChart';
import PerformanceChart from '../../components/dashboard/PerformanceChart';
import RecentActivities from '../../components/dashboard/RecentActivities';
import {
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  Sparkles,
  ArrowRight,
  Bell,
  Calendar,
  UserPlus,
  FilePlus,
  Send,
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-card p-6 sm:p-8 bg-gradient-to-r from-indigo-950 via-indigo-900 to-brand-900 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-200 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" /> Administrative Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
              Welcome back, {user?.name || 'Administrator'}!
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-xl leading-relaxed">
              Institutional operations are functioning smoothly. There are 3 unread campus alerts
              and 12 pending student enrollment applications requiring review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={ROUTES.ADMIN_STUDENTS}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-indigo-900 hover:bg-indigo-50 transition shadow-sm"
            >
              <UserPlus className="w-3.5 h-3.5" /> Add Student
            </Link>
            <Link
              to={ROUTES.ADMIN_NOTICES}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
            >
              <Send className="w-3.5 h-3.5" /> Post Notice
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Students"
          value="4,820"
          change="↑ +12.4% vs last year"
          isPositive={true}
          icon={GraduationCap}
          color="indigo"
        />
        <StatCard
          title="Faculty Members"
          value="264"
          change="14 Departments"
          isPositive={true}
          icon={Users}
          color="amber"
        />
        <StatCard
          title="Active Courses"
          value="118"
          change="Autumn Semester 2026"
          isPositive={true}
          icon={BookOpen}
          color="purple"
        />
        <StatCard
          title="Fee Revenue"
          value="$2,450,000"
          change="↑ 94.2% collected"
          isPositive={true}
          icon={CreditCard}
          color="emerald"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <PerformanceChart />
      </div>

      {/* Quick Action Navigation Panels & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quick Actions Grid */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-card p-6">
            <h3 className="text-base font-bold text-slate-800 font-['Outfit'] mb-4">
              Management Modules Direct Access
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Link
                to={ROUTES.ADMIN_STUDENTS}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/40 transition group flex flex-col items-center text-center"
              >
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform mb-2">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Students</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Directory &amp; Intake</span>
              </Link>

              <Link
                to={ROUTES.ADMIN_FACULTY}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/40 transition group flex flex-col items-center text-center"
              >
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Faculty</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Teaching Staff</span>
              </Link>

              <Link
                to={ROUTES.ADMIN_COURSES}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/40 transition group flex flex-col items-center text-center"
              >
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform mb-2">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Courses</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Curriculum &amp; Labs</span>
              </Link>

              <Link
                to={ROUTES.ADMIN_FEES}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 transition group flex flex-col items-center text-center"
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform mb-2">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Fees</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Audit &amp; Payments</span>
              </Link>

              <Link
                to={ROUTES.ADMIN_NOTICES}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 transition group flex flex-col items-center text-center"
              >
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform mb-2">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Notices</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Announcements</span>
              </Link>

              <Link
                to={ROUTES.ADMIN_EVENTS}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-rose-300 hover:bg-rose-50/40 transition group flex flex-col items-center text-center"
              >
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-110 transition-transform mb-2">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Events</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Campus Cal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Live Activities */}
        <div className="lg:col-span-6">
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
