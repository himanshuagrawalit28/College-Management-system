import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES, ROLES } from '../utils/constants';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import {
  ShieldCheck,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Award,
  Users,
  Building2,
  CalendarCheck,
  Sparkles,
} from 'lucide-react';

export const Home = () => {
  const { isAuthenticated, role, demoLogin } = useAuth();

  const getDashboardLink = () => {
    if (role === ROLES.ADMIN) return ROUTES.ADMIN_DASHBOARD;
    if (role === ROLES.FACULTY) return ROUTES.FACULTY_DASHBOARD;
    if (role === ROLES.STUDENT) return ROUTES.STUDENT_DASHBOARD;
    return ROUTES.LOGIN;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading and action buttons */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen Academic ERP Portal
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-['Outfit']">
                Empowering Minds, <br />
                <span className="bg-gradient-to-r from-indigo-600 via-brand-600 to-indigo-900 bg-clip-text text-transparent">
                  Transforming Higher Education.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                A unified campus management platform designed for administrators, faculty, and
                students. Seamless attendance tracking, real-time grading, automated fee processing,
                and digital academic workflows.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                {isAuthenticated ? (
                  <Link to={getDashboardLink()} className="btn-primary text-sm px-6 py-3">
                    Go to Your Dashboard <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <>
                    <Link to={ROUTES.LOGIN} className="btn-primary text-sm px-6 py-3">
                      Access Portal <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to={ROUTES.REGISTER} className="btn-secondary text-sm px-6 py-3">
                      New Student Registration
                    </Link>
                  </>
                )}
              </div>

              {/* Quick Demo Access Bar */}
              <div className="pt-6 border-t border-slate-200/80">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-3">
                  ⚡ Instant Demo Role Logins (Single-Click Test):
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => demoLogin(ROLES.ADMIN)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Login as Admin
                  </button>
                  <button
                    onClick={() => demoLogin(ROLES.FACULTY)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Login as Faculty
                  </button>
                  <button
                    onClick={() => demoLogin(ROLES.STUDENT)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
                  >
                    <GraduationCap className="w-3.5 h-3.5" /> Login as Student
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Banner Image & Stats Floating Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/college-banner.jpg"
                  alt="Apex College Campus"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                    Apex Global Campus
                  </span>
                  <h3 className="text-lg font-bold font-['Outfit']">
                    Ranked #1 for Digital Academic Excellence
                  </h3>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-800">98.4%</div>
                  <div className="text-xs text-slate-500 font-medium">Placement & Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Modules Section */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              Complete Academic Operations Suite
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Integrated modules built to streamline operations across all departments and roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Admin */}
            <div className="glass-card p-6 glass-card-hover border-t-4 border-t-indigo-600">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Administrative Control
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Centralized student directory, faculty onboarding, departmental course allocation,
                fee structure audits, and institutional broadcasting.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>Manage Entire Institution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2: Faculty */}
            <div className="glass-card p-6 glass-card-hover border-t-4 border-t-amber-500">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Faculty Academic Studio
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                One-tap attendance marking, student performance entry, interactive class schedules,
                and personalized subject timetables.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
                <span>Empower Educators</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3: Student */}
            <div className="glass-card p-6 glass-card-hover border-t-4 border-t-emerald-500">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Student Self-Service Hub
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Monitor attendance percentages, view semester exam grades, download fee receipts,
                and check event notifications anywhere, anytime.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>Student Success First</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College Statistics */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-['Outfit']">
                4,800+
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">Enrolled Students</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-['Outfit']">
                250+
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">Distinguished Faculty</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-['Outfit']">
                42
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">Accredited Degrees</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-['Outfit']">
                99.2%
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">System Uptime</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
