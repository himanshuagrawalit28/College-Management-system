import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Mail, Phone, BookOpen, Calendar, MapPin, Check, Edit2 } from 'lucide-react';

export const MyProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 438-9902');
  const [address, setAddress] = useState('742 Evergreen Terrace, Tech City, CA');
  const [emergencyContact, setEmergencyContact] = useState('+1 (555) 998-1122 (Guardian)');
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
            My Student Profile
          </h1>
          <p className="text-xs text-slate-500">
            Personal identity records, academic enrollment standing, and emergency details.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary text-xs"
        >
          {isEditing ? 'Cancel Editing' : 'Edit Contact Details'}
        </button>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Student profile contact information updated successfully!</span>
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-200">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
            alt={user?.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-emerald-100 shadow-md"
          />
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">{user?.name}</h2>
            <p className="text-xs text-emerald-700 font-bold">{user?.rollNumber || 'CS2023-018'}</p>
            <p className="text-xs text-slate-500">
              B.Tech in {user?.department || 'Computer Science'} &bull; {user?.semester || '6th Semester'}
            </p>
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="badge-success text-[10px]">Academic Standing: Good</span>
              <span className="badge-primary text-[10px]">Batch: {user?.batchYear || '2023-2027'}</span>
            </div>
          </div>
        </div>

        {/* Academic Stat Pill Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
              CGPA
            </span>
            <div className="text-2xl font-extrabold text-indigo-950 mt-1">
              {user?.cgpa || '3.84'}
            </div>
            <span className="text-[10px] text-indigo-600 font-medium">Scale 4.0</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
              Attendance
            </span>
            <div className="text-2xl font-extrabold text-emerald-950 mt-1">
              {user?.attendanceRate || 92}%
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Eligible</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100">
            <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
              Credits Earned
            </span>
            <div className="text-2xl font-extrabold text-purple-950 mt-1">
              112 / 160
            </div>
            <span className="text-[10px] text-purple-600 font-medium">70% Completed</span>
          </div>
        </div>

        {/* Contact & Residential Details */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Contact Phone
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
                  Emergency Guardian Contact
                </label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Permanent Residential Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Contact Info
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block mb-1">Roll Number</span>
              <span className="font-semibold text-slate-800">{user?.rollNumber || 'CS2023-018'}</span>
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
              <span className="text-slate-400 block mb-1">Emergency Contact</span>
              <span className="font-semibold text-slate-800">{emergencyContact}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
              <span className="text-slate-400 block mb-1">Residential Address</span>
              <span className="font-semibold text-slate-800">{address}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
