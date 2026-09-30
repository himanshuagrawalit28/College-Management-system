import React, { useState, useEffect } from 'react';
import studentService from '../../services/studentService';
import StudentTable from '../../components/students/StudentTable';
import StudentCard from '../../components/students/StudentCard';
import StudentForm from '../../components/students/StudentForm';
import StudentProfile from '../../components/students/StudentProfile';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Download,
} from 'lucide-react';

export const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Modals state
  const [formOpen, setFormOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreate = () => {
    setSelectedStudent(null);
    setFormOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormOpen(true);
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setProfileOpen(true);
  };

  const handleDeletePrompt = (student) => {
    setSelectedStudent(student);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (selectedStudent) {
      await studentService.updateStudent(selectedStudent.id, formData);
    } else {
      await studentService.createStudent(formData);
    }
    fetchStudents();
  };

  const handleConfirmDelete = async () => {
    if (selectedStudent) {
      await studentService.deleteStudent(selectedStudent.id);
      fetchStudents();
    }
  };

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'All' || student.department === deptFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Student Management
          </h1>
          <p className="text-xs text-slate-500">
            Total of {students.length} registered students enrolled in academic courses.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCreate}
            className="btn-primary text-xs"
          >
            <Plus className="w-4 h-4" /> Add New Student
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, roll no, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        {/* Filters & View switcher */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="text-xs rounded-xl border border-slate-200 px-3 py-2 bg-white text-slate-700 focus:outline-none"
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">Computer Science</option>
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

      {/* Main Content Area */}
      {loading ? (
        <Loader text="Loading student records..." />
      ) : viewMode === 'table' ? (
        <StudentTable
          students={filteredStudents}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeletePrompt}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDeletePrompt}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <StudentForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedStudent}
      />

      <StudentProfile
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        student={selectedStudent}
      />

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove Student Record"
        message={`Are you sure you want to delete ${selectedStudent?.name} (${selectedStudent?.rollNumber})? This will archive their enrollment data.`}
        confirmText="Delete Student"
      />
    </div>
  );
};

export default ManageStudents;
