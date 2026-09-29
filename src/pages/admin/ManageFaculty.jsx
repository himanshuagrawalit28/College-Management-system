import React, { useState, useEffect } from 'react';
import facultyService from '../../services/facultyService';
import FacultyTable from '../../components/faculty/FacultyTable';
import FacultyCard from '../../components/faculty/FacultyCard';
import FacultyForm from '../../components/faculty/FacultyForm';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';
import {
  Users,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
} from 'lucide-react';

export const ManageFaculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table');

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const data = await facultyService.getAllFaculty();
      setFacultyList(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleCreate = () => {
    setSelectedFaculty(null);
    setFormOpen(true);
  };

  const handleEdit = (fac) => {
    setSelectedFaculty(fac);
    setFormOpen(true);
  };

  const handleDeletePrompt = (fac) => {
    setSelectedFaculty(fac);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (selectedFaculty) {
      // update
      setFacultyList((prev) =>
        prev.map((f) => (f.id === selectedFaculty.id ? { ...f, ...formData } : f))
      );
    } else {
      await facultyService.createFaculty(formData);
      fetchFaculty();
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedFaculty) {
      await facultyService.deleteFaculty(selectedFaculty.id);
      fetchFaculty();
    }
  };

  const filteredFaculty = facultyList.filter((fac) => {
    const matchesSearch =
      fac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'All' || fac.department === deptFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Faculty Management
          </h1>
          <p className="text-xs text-slate-500">
            Total of {facultyList.length} faculty members and academic researchers.
          </p>
        </div>

        <button onClick={handleCreate} className="btn-primary text-xs">
          <Plus className="w-4 h-4" /> Onboard Faculty Member
        </button>
      </div>

      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by faculty name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="text-xs rounded-xl border border-slate-200 px-3 py-2 bg-white text-slate-700 focus:outline-none"
            >
              <option value="All">All Departments</option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading faculty directory..." />
      ) : viewMode === 'table' ? (
        <FacultyTable
          facultyList={filteredFaculty}
          onEdit={handleEdit}
          onDelete={handleDeletePrompt}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFaculty.map((fac) => (
            <FacultyCard
              key={fac.id}
              faculty={fac}
              onEdit={handleEdit}
              onDelete={handleDeletePrompt}
            />
          ))}
        </div>
      )}

      <FacultyForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedFaculty}
      />

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove Faculty Member"
        message={`Are you sure you want to remove ${selectedFaculty?.name} (${selectedFaculty?.employeeId}) from the institution?`}
        confirmText="Remove"
      />
    </div>
  );
};

export default ManageFaculty;
