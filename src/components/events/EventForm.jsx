import React, { useState } from 'react';
import Modal from '../common/Modal';
import { validateRequired } from '../../utils/validation';
import { AlertCircle } from 'lucide-react';

export const EventForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    venue: '',
    date: '',
    time: '10:00 AM - 04:00 PM',
    organizer: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateRequired(formData.title)) {
      setError('Event title is required.');
      return;
    }
    if (!validateRequired(formData.venue)) {
      setError('Venue is required.');
      return;
    }
    if (!validateRequired(formData.date)) {
      setError('Event date is required.');
      return;
    }

    onSubmit(formData);
    setFormData({
      title: '',
      category: 'Academic',
      venue: '',
      date: '',
      time: '10:00 AM - 04:00 PM',
      organizer: '',
      description: '',
    });
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Campus Event" maxWidth="max-w-lg">
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Event Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder="e.g. Annual Tech Symposium & Hackathon"
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
              <option>Sports</option>
              <option>Cultural</option>
              <option>Career & Placement</option>
              <option>Robotics & Tech</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Organizer Club / Dept
            </label>
            <input
              type="text"
              value={formData.organizer}
              onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              className="input-field"
              placeholder="e.g. ACM Student Chapter"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Event Date *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Event Timings
            </label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="input-field"
              placeholder="e.g. 10:00 AM - 05:00 PM"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Campus Venue *
          </label>
          <input
            type="text"
            required
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            className="input-field"
            placeholder="e.g. Main Auditorium & Innovation Quad"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Event Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input-field resize-none"
            placeholder="Keynote speakers, competitions, registration requirements..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Schedule Event
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventForm;
