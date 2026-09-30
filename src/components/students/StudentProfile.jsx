import React from 'react';
import Modal from '../common/Modal';
import { Mail, Phone, BookOpen, Calendar, Award, CheckCircle } from 'lucide-react';

export const StudentProfile = ({ isOpen, onClose, student }) => {
  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Student Academic Profile" maxWidth="max-w-xl">
      <div className="space-y-6">
        {/* Header summary */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <img
            src={student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={student.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-100"
          />
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">{student.name}</h3>
            <p className="text-xs text-indigo-600 font-semibold">{student.rollNumber}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {student.department} &bull; {student.semester}
            </p>
          </div>
        </div>

        {/* Academic Overview Metrics */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
              CGPA
            </span>
            <div className="text-xl font-extrabold text-indigo-900 mt-1">
              {student.cgpa || '3.80'}
            </div>
            <span className="text-[10px] text-indigo-600 font-medium">Out of 4.0</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
              Attendance
            </span>
            <div className="text-xl font-extrabold text-emerald-900 mt-1">
              {student.attendanceRate || 92}%
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Eligible</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">
              Status
            </span>
            <div className="text-sm font-bold text-slate-800 mt-2">
              {student.status || 'Active'}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Enrolled</span>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 text-xs text-slate-600 p-2.5 rounded-xl bg-slate-50">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Email:</span>
            <span>{student.email}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600 p-2.5 rounded-xl bg-slate-50">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Phone:</span>
            <span>{student.phone || '+1 (555) 438-9902'}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600 p-2.5 rounded-xl bg-slate-50">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Batch Duration:</span>
            <span>{student.batchYear || '2023-2027'} (4 Years Undergraduate)</span>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button onClick={onClose} className="btn-secondary">
            Close Profile
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StudentProfile;
