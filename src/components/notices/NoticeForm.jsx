import React, { useState } from 'react';
import Modal from '../common/Modal';
import { validateRequired } from '../../utils/validation';
import { AlertCircle } from 'lucide-react';

export const NoticeForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    content: '',
    author: 'Dean Office',
    pinned: false,
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateRequired(formData.title)) {
      setError('Notice title is required.');
      return;
    }
    if (!validateRequired(formData.content)) {
      setError('Notice description / content is required.');
      return;
    }

    onSubmit(formData);
    setFormData({
      title: '',
      category: 'Academic',
      content: '',
      author: 'Dean Office',
      pinned: false,
    });
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Publish New Campus Notice" maxWidth="max-w-lg">
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Notice Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder="e.g. Autumn Semester Exam Schedule Released"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
            >
              <option>Academic</option>
              <option>Examination</option>
              <option>Events</option>
              <option>Finance</option>
              <option>Administration</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Issuing Authority
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="input-field"
              placeholder="e.g. Examination Cell"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Notice Circular Body *
          </label>
          <textarea
            required
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="input-field resize-none"
            placeholder="Write the full circular announcement details here..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="pinned"
            checked={formData.pinned}
            onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="pinned" className="text-xs font-medium text-slate-700 cursor-pointer">
            Pin this notice to top of student and faculty boards
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Publish Notice
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NoticeForm;
