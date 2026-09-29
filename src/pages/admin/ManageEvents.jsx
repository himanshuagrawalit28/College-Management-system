import React, { useState, useEffect } from 'react';
import noticeService from '../../services/noticeService';
import EventList from '../../components/events/EventList';
import EventForm from '../../components/events/EventForm';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';
import { Calendar, Plus, Search, Filter } from 'lucide-react';

export const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await noticeService.getEvents();
      setEvents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = async (formData) => {
    await noticeService.createEvent(formData);
    fetchEvents();
  };

  const handleDeletePrompt = (event) => {
    setSelectedEvent(event);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEvent) {
      await noticeService.deleteEvent(selectedEvent.id);
      fetchEvents();
    }
  };

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || e.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Campus Events &amp; Activities
          </h1>
          <p className="text-xs text-slate-500">
            Coordinate symposiums, sports meets, hackathons, and cultural festivals.
          </p>
        </div>

        <button onClick={() => setFormOpen(true)} className="btn-primary text-xs">
          <Plus className="w-4 h-4" /> Schedule New Event
        </button>
      </div>

      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events or venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 px-3 py-2 bg-white text-slate-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Career">Career</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading campus schedule..." />
      ) : (
        <EventList events={filteredEvents} onDelete={handleDeletePrompt} />
      )}

      <EventForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
      />

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Cancel Campus Event"
        message={`Are you sure you want to cancel "${selectedEvent?.title}"? This event will be removed from all student and faculty calendars.`}
        confirmText="Cancel Event"
      />
    </div>
  );
};

export default ManageEvents;
