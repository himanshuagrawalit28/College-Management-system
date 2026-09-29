import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Target, Award, Users2, History, CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
              About Apex College
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
              Nurturing Leaders, Engineers, and Innovators
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Established in 1998, Apex Institute of Higher Education is accredited by NAAC Grade
              A++ and recognized globally for research excellence and academic discipline.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">Our Mission</h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                To deliver comprehensive, holistic education fusing strong theoretical fundamentals
                with hands-on industry application. We cultivate ethical values, leadership qualities,
                and innovative problem-solving in every learner.
              </p>
            </div>

            <div className="glass-card p-8 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">Our Vision</h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                To be an internationally distinguished research and educational center fostering
                pioneering technological breakthroughs, entrepreneurship, and sustainable societal
                progress.
              </p>
            </div>
          </div>

          {/* Key Pillars */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6 font-['Outfit']">
              Why Students Choose Apex
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'State-of-the-Art Robotic & AI Research Laboratories',
                '100% Digitalized Campus Operations via ERP System',
                'Internationally Published Faculty Mentors',
                'Active Partnerships with 140+ Fortune 500 Companies',
                'Zero-Tolerance Anti-Ragging & Inclusive Environment',
                'Merit Scholarships & Financial Aid Grants Available',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
