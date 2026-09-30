import React, { useState, useEffect } from 'react';
import resultService from '../../services/resultService';
import { calculateGrade } from '../../utils/helpers';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import { Award, Plus, Search, Filter, CheckCircle2, Download } from 'lucide-react';

const INITIAL_FACULTY_STUDENTS = [
  { rollNumber: 'CS2023-001', studentName: 'Alex Rivera', marks: 94, totalMarks: 100, examType: 'Mid-Term', subject: 'Data Structures' },
  { rollNumber: 'CS2023-002', studentName: 'Sophia Patel', marks: 96, totalMarks: 100, examType: 'Mid-Term', subject: 'Data Structures' },
  { rollNumber: 'CS2023-003', studentName: 'Liam Vance', marks: 82, totalMarks: 100, examType: 'Mid-Term', subject: 'Data Structures' },
  { rollNumber: 'CS2023-004', studentName: 'Emma Watson', marks: 74, totalMarks: 100, examType: 'Mid-Term', subject: 'Data Structures' },
  { rollNumber: 'CS2023-005', studentName: 'Noah Hernandez', marks: 88, totalMarks: 100, examType: 'Mid-Term', subject: 'Data Structures' },
];

export const ManageResults = () => {
  const [results, setResults] = useState(INITIAL_FACULTY_STUDENTS);
  const [subject, setSubject] = useState('Data Structures');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // New grade entry state
  const [newRoll, setNewRoll] = useState('');
  const [newName, setNewName] = useState('');
  const [newMarks, setNewMarks] = useState('');
  const [newTotal, setNewTotal] = useState('100');
  const [newExam, setNewExam] = useState('Mid-Term Exam');

  const handleAddGrade = (e) => {
    e.preventDefault();
    if (!newRoll || !newName || !newMarks) return;

    const entry = {
      rollNumber: newRoll,
      studentName: newName,
      marks: parseFloat(newMarks),
      totalMarks: parseFloat(newTotal) || 100,
      examType: newExam,
      subject: subject,
    };

    setResults([entry, ...results]);
    setNewRoll('');
    setNewName('');
    setNewMarks('');
    setModalOpen(false);
  };

  const filteredResults = results.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Student Marks &amp; Examination Grading
          </h1>
          <p className="text-xs text-slate-500">
            Submit marks, verify grade distributions, and publish academic evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button onClick={() => setModalOpen(true)} className="btn-primary text-xs">
            <Plus className="w-4 h-4" /> Enter Student Marks
          </button>
        </div>
      </div>

      {/* Subject Filter & Controls */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs font-semibold text-slate-600">Assigned Course:</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 px-3 py-2 bg-white text-slate-700 focus:outline-none"
          >
            <option value="Data Structures">CS301 - Data Structures</option>
            <option value="Cloud Computing">CS402 - Cloud Computing</option>
          </select>
        </div>
      </div>

      {/* Grade Ledger Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 font-['Outfit']">
            {subject} - Evaluation Grade Sheet
          </h3>
          <span className="badge-primary">{filteredResults.length} Enrolled Students</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Evaluation Type</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResults.map((r, idx) => {
                const pct = (r.marks / r.totalMarks) * 100;
                const gradeInfo = calculateGrade(pct);
                const isPass = pct >= 50;

                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 px-4 font-semibold text-slate-700">{r.rollNumber}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{r.studentName}</td>
                    <td className="py-3 px-4 text-slate-500">{r.examType}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {r.marks} / {r.totalMarks}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{pct.toFixed(1)}%</td>
                    <td className="py-3 px-4">
                      <span className="badge-primary font-bold">{gradeInfo.grade}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          isPass ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isPass ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enter Marks Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Enter Student Examination Marks"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddGrade} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student Roll Number *
            </label>
            <input
              type="text"
              required
              value={newRoll}
              onChange={(e) => setNewRoll(e.target.value)}
              placeholder="e.g. CS2023-010"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student Name *
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Benjamin White"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Assessment Type
            </label>
            <select
              value={newExam}
              onChange={(e) => setNewExam(e.target.value)}
              className="input-field"
            >
              <option>Mid-Term Exam</option>
              <option>Final End-Semester Exam</option>
              <option>Lab Practical Evaluation</option>
              <option>Continuous Internal Assessment</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Marks Obtained *
              </label>
              <input
                type="number"
                required
                min="0"
                max={newTotal}
                value={newMarks}
                onChange={(e) => setNewMarks(e.target.value)}
                placeholder="85"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Max Marks
              </label>
              <input
                type="number"
                value={newTotal}
                onChange={(e) => setNewTotal(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Record Grade
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageResults;
