import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { ROUTES, ROLES } from '../../utils/constants';
import { Bell, LogOut, Menu, User, ShieldCheck, BookOpen, GraduationCap, ChevronDown } from 'lucide-react';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, isAuthenticated, logout, role, demoLogin } = useAuth();
  const { unreadNotifications, markAllNotificationsAsRead } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const getRoleBadge = (currentRole) => {
    switch (currentRole) {
      case ROLES.ADMIN:
        return (
          <span className="badge-primary flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin
          </span>
        );
      case ROLES.FACULTY:
        return (
          <span className="badge-warning flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Faculty
          </span>
        );
      case ROLES.STUDENT:
        return (
          <span className="badge-success flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" /> Student
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Hamburger for dashboard layout + Logo */}
          <div className="flex items-center gap-3">
            {isAuthenticated && onToggleSidebar && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden focus:outline-none"
                aria-label="Toggle Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Apex College Logo"
                className="w-10 h-10 object-contain rounded-xl shadow-sm border border-slate-200/80 group-hover:scale-105 transition-transform"
              />
              <div className="hidden sm:block">
                <span className="text-base font-bold text-slate-900 tracking-tight font-['Outfit'] block leading-none">
                  Apex College
                </span>
                <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                  Management System
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Public Links when NOT in dashboard or general navigation */}
          {!isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
              <Link to={ROUTES.HOME} className="hover:text-indigo-600 transition">
                Home
              </Link>
              <Link to={ROUTES.ABOUT} className="hover:text-indigo-600 transition">
                About Us
              </Link>
              <Link to={ROUTES.CONTACT} className="hover:text-indigo-600 transition">
                Contact
              </Link>
            </nav>
          )}

          {/* Right section: Auth status / Notifications / Profile */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Demo Switcher Quick Buttons */}
                <div className="hidden xl:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
                  <span className="text-slate-400 font-medium px-2">Switch Demo:</span>
                  <button
                    onClick={() => demoLogin(ROLES.ADMIN)}
                    className={`px-2 py-1 rounded-lg transition font-medium ${
                      role === ROLES.ADMIN ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => demoLogin(ROLES.FACULTY)}
                    className={`px-2 py-1 rounded-lg transition font-medium ${
                      role === ROLES.FACULTY ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Faculty
                  </button>
                  <button
                    onClick={() => demoLogin(ROLES.STUDENT)}
                    className={`px-2 py-1 rounded-lg transition font-medium ${
                      role === ROLES.STUDENT ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Student
                  </button>
                </div>

                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setNotifOpen(!notifOpen);
                      setDropdownOpen(false);
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-indigo-600 rounded-full ring-2 ring-white animate-pulse" />
                    )}
                  </button>

                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50">
                      <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                        <span className="text-sm font-semibold text-slate-800">Notifications</span>
                        {unreadNotifications > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-xs text-indigo-600 hover:underline"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="px-4 py-3 text-xs text-slate-500 space-y-2">
                        <div className="p-2 rounded-lg bg-indigo-50/60 border border-indigo-100/50">
                          <p className="font-semibold text-slate-800">Semester Exam Dates Posted</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Mid-term examinations start Oct 18, 2026.</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                          <p className="font-semibold text-slate-800">Fee Due Reminder</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Autumn semester balance due in 10 days.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Pill */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      setNotifOpen(false);
                    }}
                    className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
                  >
                    <div className="text-left hidden md:block">
                      <p className="text-xs font-semibold text-slate-800 line-clamp-1">{user?.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">{getRoleBadge(role)}</div>
                    </div>
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={user?.name}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                    />
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 md:hidden">
                        <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                        <p className="text-xs text-slate-500">{user?.email}</p>
                        <div className="mt-1.5">{getRoleBadge(role)}</div>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to={ROUTES.LOGIN} className="btn-secondary text-xs sm:text-sm py-2">
                  Sign In
                </Link>
                <Link to={ROUTES.REGISTER} className="btn-primary text-xs sm:text-sm py-2">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
