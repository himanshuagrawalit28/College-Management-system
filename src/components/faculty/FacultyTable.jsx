import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export const FacultyTable = ({ facultyList, onEdit, onDelete }) => {
  if (!facultyList || facultyList.length === 0) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm">
        No faculty members found matching your search.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase font-semibold">
            <tr>
              <th className="py-3.5 px-4">Faculty Member</th>
              <th className="py-3.5 px-4">Employee ID</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Designation</th>
              <th className="py-3.5 px-4">Experience</th>
              <th className="py-3.5 px-4">Contact Phone</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {facultyList.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-slate-50/50 transition">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={faculty.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                      alt={faculty.name}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">{faculty.name}</span>
                      <span className="text-[11px] text-slate-400">{faculty.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-slate-700">{faculty.employeeId}</td>
                <td className="py-3 px-4 text-slate-600">{faculty.department}</td>
                <td className="py-3 px-4">
                  <span className="badge-warning text-[10px]">{faculty.designation}</span>
                </td>
                <td className="py-3 px-4 text-slate-600">{faculty.experience || '8 Years'}</td>
                <td className="py-3 px-4 text-slate-600">{faculty.phone || '+1 (555) 839-1123'}</td>
                <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(faculty)}
                    className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                    title="Edit Record"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(faculty)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Remove Faculty"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyTable;
