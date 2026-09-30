import React from 'react';
import { BookOpen, User, CheckCircle2 } from 'lucide-react';

export const SubjectList = ({ subjects }) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase font-semibold">
            <tr>
              <th className="py-3.5 px-4">Subject Code</th>
              <th className="py-3.5 px-4">Subject Title</th>
              <th className="py-3.5 px-4">Assigned Faculty</th>
              <th className="py-3.5 px-4">Credit Hours</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Syllabus Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subjects.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/50 transition">
                <td className="py-3 px-4 font-bold text-indigo-600">{sub.code}</td>
                <td className="py-3 px-4 font-semibold text-slate-800">{sub.name}</td>
                <td className="py-3 px-4 text-slate-600">{sub.faculty}</td>
                <td className="py-3 px-4 text-slate-700">{sub.credits} Credits</td>
                <td className="py-3 px-4">
                  <span className="badge-primary text-[10px]">{sub.type || 'Theory'}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectList;
