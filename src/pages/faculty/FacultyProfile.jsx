import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Building, Briefcase, BookOpen, Clock, MapPin, Award, Check } from 'lucide-react';

export const FacultyProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 839-1123');
  const [cabin, setCabin] = useState('Room 304, Tech Wing');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Faculty Academic Profile
          </h1>
          <p className="text-xs text-slate-500">
            Teaching credentials, research specializations, and departmental contact.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary text-xs"
        >
          {isEditing ? 'Cancel Editing' : 'Edit Contact Info'}
        </button>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Profile contact details updated successfully!</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-200">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
            alt={user?.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-amber-100 shadow-md"
          />
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">{user?.name}</h2>
            <p className="text-xs text-amber-800 font-bold">{user?.designation || 'Associate Professor'}</p>
            <p className="text-xs text-slate-500">
              Department of {user?.department || 'Computer Science & Engineering'}
            </p>
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="badge-warning text-[10px]">Ph.D. in Computer Science</span>
              <span className="badge-primary text-[10px]">IEEE Senior Member</span>
            </div>
          </div>
        </div>

        {/* Form or Info Display */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Faculty Cabin / Office Room
                </label>
                <input
                  type="text"
                  value={cabin}
                  onChange={(e) => setCabin(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Profile
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block mb-1">Employee ID</span>
              <span className="font-semibold text-slate-800">{user?.employeeId || 'FAC-2023-042'}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block mb-1">Institutional Email</span>
              <span className="font-semibold text-slate-800">{user?.email}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block mb-1">Phone Number</span>
              <span className="font-semibold text-slate-800">{phone}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block mb-1">Office Room &amp; Wing</span>
              <span className="font-semibold text-slate-800">{cabin}</span>
            </div>
          </div>
        )}

        {/* Assigned Subjects & Specializations */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-3 font-['Outfit']">
            Assigned Courses (Autumn Semester 2026)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">CS301: Data Structures</span>
                <span className="text-[11px] text-slate-500">45 Enrolled Students &bull; 4 Credits</span>
              </div>
              <span className="badge-primary">Core</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">CS402: Cloud Architecture</span>
                <span className="text-[11px] text-slate-500">38 Enrolled Students &bull; 3 Credits</span>
              </div>
              <span className="badge-warning">Elective</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
