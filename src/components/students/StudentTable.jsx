import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

export const StudentTable = ({ students, onView, onEdit, onDelete }) => {
  if (!students || students.length === 0) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm">
        No students found matching your criteria.
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
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Semester</th>
              <th className="py-3.5 px-4">CGPA</th>
              <th className="py-3.5 px-4">Attendance</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={student.name}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">{student.name}</span>
                      <span className="text-[11px] text-slate-400">{student.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-slate-700">{student.rollNumber}</td>
                <td className="py-3 px-4 text-slate-600">{student.department}</td>
                <td className="py-3 px-4 text-slate-600">{student.semester}</td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-emerald-600">{student.cgpa || '3.80'}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${student.attendanceRate || 90}%` }}
                      />
                    </div>
                    <span className="font-semibold text-indigo-600">{student.attendanceRate || 90}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      student.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {student.status || 'Active'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                  <button
                    onClick={() => onView(student)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    title="View Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(student)}
                    className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                    title="Edit Record"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(student)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete Record"
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

export default StudentTable;
