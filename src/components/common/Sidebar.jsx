import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROUTES } from '../../utils/constants';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  Award,
  CreditCard,
  Bell,
  Calendar,
  User,
  Clock,
  X,
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { role, user } = useAuth();

  const getLinks = () => {
    switch (role) {
      case ROLES.ADMIN:
        return [
          { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
          { name: 'Student Management', path: ROUTES.ADMIN_STUDENTS, icon: GraduationCap },
          { name: 'Faculty Management', path: ROUTES.ADMIN_FACULTY, icon: Users },
          { name: 'Courses & Subjects', path: ROUTES.ADMIN_COURSES, icon: BookOpen },
          { name: 'Fees & Finance', path: ROUTES.ADMIN_FEES, icon: CreditCard },
          { name: 'Notices Board', path: ROUTES.ADMIN_NOTICES, icon: Bell },
          { name: 'Campus Events', path: ROUTES.ADMIN_EVENTS, icon: Calendar },
        ];
      case ROLES.FACULTY:
        return [
          { name: 'Faculty Dashboard', path: ROUTES.FACULTY_DASHBOARD, icon: LayoutDashboard },
          { name: 'My Profile', path: ROUTES.FACULTY_PROFILE, icon: User },
          { name: 'Mark Attendance', path: ROUTES.FACULTY_ATTENDANCE, icon: CalendarCheck },
          { name: 'Manage Results', path: ROUTES.FACULTY_RESULTS, icon: Award },
          { name: 'My Timetable', path: ROUTES.FACULTY_TIMETABLE, icon: Clock },
        ];
      case ROLES.STUDENT:
        return [
          { name: 'Student Dashboard', path: ROUTES.STUDENT_DASHBOARD, icon: LayoutDashboard },
          { name: 'My Profile', path: ROUTES.STUDENT_PROFILE, icon: User },
          { name: 'Attendance', path: ROUTES.STUDENT_ATTENDANCE, icon: CalendarCheck },
          { name: 'Exam Results', path: ROUTES.STUDENT_RESULTS, icon: Award },
          { name: 'Fee Payments', path: ROUTES.STUDENT_FEES, icon: CreditCard },
          { name: 'My Timetable', path: ROUTES.STUDENT_TIMETABLE, icon: Clock },
          { name: 'Campus Notices', path: ROUTES.STUDENT_NOTICES, icon: Bell },
        ];
      default:
        return [];
    }
  };

  const navLinks = getLinks();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow shadow-indigo-200">
              A
            </div>
            <div>
              <span className="font-bold text-slate-800 tracking-tight text-sm">
                Apex Portal
              </span>
              <span className="text-[10px] text-indigo-600 block uppercase font-semibold">
                {role} mode
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu Navigation
          </div>
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom User Snapshot */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/80 shadow-sm">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={user?.name}
              className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-100"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">{user?.name}</p>
              <p className="text-[11px] text-slate-500 truncate">{user?.department || 'Academic Dept'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
