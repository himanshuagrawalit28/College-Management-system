import React, { useState, useEffect } from 'react';
import noticeService from '../../services/noticeService';
import NoticeList from '../../components/notices/NoticeList';
import NoticeForm from '../../components/notices/NoticeForm';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';
import { Bell, Plus, Search, Filter } from 'lucide-react';

export const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const data = await noticeService.getNotices();
      setNotices(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreate = async (formData) => {
    await noticeService.createNotice(formData);
    fetchNotices();
  };

  const handleDeletePrompt = (notice) => {
    setSelectedNotice(notice);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedNotice) {
      await noticeService.deleteNotice(selectedNotice.id);
      fetchNotices();
    }
  };

  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || n.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Campus Notices &amp; Circulars
          </h1>
          <p className="text-xs text-slate-500">
            Broadcast institutional circulars, exam notifications, and emergency alerts.
          </p>
        </div>

        <button onClick={() => setFormOpen(true)} className="btn-primary text-xs">
          <Plus className="w-4 h-4" /> Publish New Notice
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars..."
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
            <option value="Examination">Examination</option>
            <option value="Academic">Academic</option>
            <option value="Events">Events</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading notices..." />
      ) : (
        <NoticeList notices={filteredNotices} onDelete={handleDeletePrompt} />
      )}

      <NoticeForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
      />

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Campus Notice"
        message={`Are you sure you want to remove notice "${selectedNotice?.title}"?`}
        confirmText="Delete Notice"
      />
    </div>
  );
};

export default ManageNotices;
