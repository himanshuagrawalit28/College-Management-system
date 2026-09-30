import React from 'react';
import { Eye, Edit, Trash2, Mail, Phone, BookOpen } from 'lucide-react';

export const StudentCard = ({ student, onView, onEdit, onDelete }) => {
  return (
    <div className="glass-card p-5 glass-card-hover flex flex-col justify-between space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={student.name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{student.name}</h4>
            <span className="text-xs text-indigo-600 font-semibold">{student.rollNumber}</span>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
            student.status === 'Active'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {student.status || 'Active'}
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span>Department:</span>
          <span className="font-medium text-slate-700">{student.department}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Semester:</span>
          <span className="font-medium text-slate-700">{student.semester}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>CGPA:</span>
          <span className="font-semibold text-emerald-600">{student.cgpa || '3.80'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Attendance:</span>
          <span className="font-semibold text-indigo-600">{student.attendanceRate || 92}%</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 pt-3 border-t border-slate-100">
        <button
          onClick={() => onView(student)}
          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
          title="View Profile"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(student)}
          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
          title="Edit Student"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(student)}
          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          title="Delete Student"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
