import React, { useState } from 'react';
import { Award, Download, CheckCircle2, BookOpen, Star, FileText } from 'lucide-react';

const SEMESTER_RESULTS = [
  { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, marks: 94, totalMarks: 100, grade: 'A+', points: 10 },
  { code: 'CS302', name: 'Computer Networks & Protocols', credits: 3, marks: 88, totalMarks: 100, grade: 'A', points: 9 },
  { code: 'CS303', name: 'Operating Systems Internals', credits: 4, marks: 85, totalMarks: 100, grade: 'A', points: 9 },
  { code: 'CS304', name: 'Relational & NoSQL Database Systems', credits: 4, marks: 91, totalMarks: 100, grade: 'A+', points: 10 },
  { code: 'CS305', name: 'Software Engineering Methodologies', credits: 3, marks: 82, totalMarks: 100, grade: 'B+', points: 8 },
];

export const MyResults = () => {
  const [semester, setSemester] = useState('5th Semester (Autumn 2025)');

  // Calculate SGPA: sum(credits * points) / sum(credits)
  const totalCredits = SEMESTER_RESULTS.reduce((sum, r) => sum + r.credits, 0);
  const totalPoints = SEMESTER_RESULTS.reduce((sum, r) => sum + r.credits * r.points, 0);
  const sgpa = (totalPoints / totalCredits).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Academic Transcripts &amp; Grades
          </h1>
          <p className="text-xs text-slate-500">
            Verified university examination marks, semester SGPA, and cumulative CGPA ledger.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="btn-primary text-xs"
        >
          <Download className="w-4 h-4" /> Download Official Grade Sheet
        </button>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Semester SGPA</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 font-['Outfit']">{sgpa}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold">Distinction Grade</span>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
            <Star className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Cumulative CGPA</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 font-['Outfit']">3.84</h3>
            <span className="text-[11px] text-slate-500">Across 5 Semesters</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Credits Earned</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 font-['Outfit']">
              {totalCredits} Credits
            </h3>
            <span className="text-[11px] text-indigo-600 font-semibold">100% Passed</span>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Semester Selector */}
      <div className="glass-card p-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700">Select Academic Term:</span>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="text-xs rounded-xl border border-slate-200 px-3 py-2 bg-white text-slate-700 focus:outline-none"
        >
          <option>5th Semester (Autumn 2025)</option>
          <option>4th Semester (Spring 2025)</option>
          <option>3rd Semester (Autumn 2024)</option>
        </select>
      </div>

      {/* Grade Ledger */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 font-['Outfit']">
            {semester} Grade Ledger
          </h3>
          <span className="badge-success">Official Result Published</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Subject Code</th>
                <th className="py-3 px-4">Course Name</th>
                <th className="py-3 px-4">Credits</th>
                <th className="py-3 px-4">Marks Obtained</th>
                <th className="py-3 px-4">Letter Grade</th>
                <th className="py-3 px-4">Grade Points</th>
                <th className="py-3 px-4 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SEMESTER_RESULTS.map((row) => (
                <tr key={row.code} className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-4 font-bold text-indigo-600">{row.code}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{row.name}</td>
                  <td className="py-3.5 px-4 text-slate-600">{row.credits}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {row.marks} / {row.totalMarks}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="badge-primary font-bold">{row.grade}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{row.points} / 10</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyResults;
