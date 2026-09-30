import React from 'react';
import { Mail, Phone, BookOpen, Trash2, Edit, Briefcase } from 'lucide-react';

export const FacultyCard = ({ faculty, onEdit, onDelete }) => {
  return (
    <div className="glass-card p-5 glass-card-hover flex flex-col justify-between space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={faculty.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
            alt={faculty.name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{faculty.name}</h4>
            <span className="text-xs text-amber-700 font-semibold">{faculty.employeeId}</span>
          </div>
        </div>
        <span className="badge-warning text-[10px]">{faculty.designation || 'Professor'}</span>
      </div>

      <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span>Department:</span>
          <span className="font-medium text-slate-700">{faculty.department}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Experience:</span>
          <span className="font-medium text-slate-700">{faculty.experience || '8+ Years'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Email:</span>
          <span className="font-medium text-slate-700 truncate max-w-[150px]">{faculty.email}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 pt-3 border-t border-slate-100">
        <button
          onClick={() => onEdit(faculty)}
          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
          title="Edit Details"
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
      </div>
    </div>
  );
};

export default FacultyCard;
