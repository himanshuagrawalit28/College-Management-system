import React from 'react';
import { calculateGrade } from '../../utils/helpers';
import { Award, CheckCircle, AlertCircle } from 'lucide-react';

export const ResultTable = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm">
        No examination results available.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase font-semibold">
            <tr>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4">Roll Number</th>
              <th className="py-3.5 px-4">Subject</th>
              <th className="py-3.5 px-4">Marks Obtained</th>
              <th className="py-3.5 px-4">Total Marks</th>
              <th className="py-3.5 px-4">Grade</th>
              <th className="py-3.5 px-4">Semester</th>
              <th className="py-3.5 px-4 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((res) => {
              const percentage = (res.marks / res.totalMarks) * 100;
              const gradeInfo = calculateGrade(percentage);
              const isPass = percentage >= 50;

              return (
                <tr key={res.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 px-4 font-bold text-slate-800">{res.studentName}</td>
                  <td className="py-3 px-4 text-slate-600 font-semibold">{res.rollNumber}</td>
                  <td className="py-3 px-4 text-slate-700">{res.subject}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{res.marks}</td>
                  <td className="py-3 px-4 text-slate-500">{res.totalMarks}</td>
                  <td className="py-3 px-4">
                    <span className="badge-primary font-bold">{res.grade || gradeInfo.grade}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{res.semester}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 font-bold ${
                        isPass ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isPass ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      {isPass ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
