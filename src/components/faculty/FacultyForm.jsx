import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { validateEmail, validateRequired } from '../../utils/validation';
import { AlertCircle } from 'lucide-react';

export const FacultyForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    phone: '',
    experience: '5 Years',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        employeeId: initialData.employeeId || '',
        department: initialData.department || 'Computer Science & Engineering',
        designation: initialData.designation || 'Associate Professor',
        phone: initialData.phone || '',
        experience: initialData.experience || '5 Years',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        employeeId: `FAC-2026-${Math.floor(100 + Math.random() * 900)}`,
        department: 'Computer Science & Engineering',
        designation: 'Assistant Professor',
        phone: '',
        experience: '4 Years',
      });
    }
    setError('');
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateRequired(formData.name)) {
      setError('Faculty member name is required.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please provide a valid official email address.');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Faculty Member' : 'Onboard New Faculty'}
      maxWidth="max-w-xl"
    >
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder="e.g. Dr. Alan Grant"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Employee ID *
            </label>
            <input
              type="text"
              required
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              className="input-field"
              placeholder="FAC-2026-042"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              placeholder="prof.grant@apexcollege.edu"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field"
              placeholder="+1 (555) 019-4829"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Department
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="input-field"
            >
              <option>Computer Science & Engineering</option>
              <option>Electrical Engineering</option>
              <option>Mechanical Engineering</option>
              <option>Civil Engineering</option>
              <option>Mathematics & Computing</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Designation
            </label>
            <select
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="input-field"
            >
              <option>Assistant Professor</option>
              <option>Associate Professor</option>
              <option>Professor & Dean</option>
              <option>Head of Department</option>
              <option>Visiting Lecturer</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Teaching Experience
          </label>
          <input
            type="text"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="input-field"
            placeholder="e.g. 8 Years"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {initialData ? 'Save Changes' : 'Onboard Faculty'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FacultyForm;
