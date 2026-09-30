import React, { useState } from 'react';
import CourseList from '../../components/academics/CourseList';
import SubjectList from '../../components/academics/SubjectList';
import Timetable from '../../components/academics/Timetable';
import ResultTable from '../../components/academics/ResultTable';
import { BookOpen, Layers, Clock, Award, Plus } from 'lucide-react';

const SEED_COURSES = [
  {
    id: 'crs_1',
    code: 'B.TECH CSE',
    title: 'Computer Science & Engineering',
    description: 'Comprehensive 4-year degree focusing on Software Architecture, AI, and Cloud Systems.',
    credits: 160,
    semester: '8 Semesters',
    enrolledStudents: 240,
  },
  {
    id: 'crs_2',
    code: 'B.TECH ECE',
    title: 'Electronics & Communication',
    description: 'Modern curriculum covering VLSI Design, Embedded IoT Systems, and Signal Processing.',
    credits: 156,
    semester: '8 Semesters',
    enrolledStudents: 180,
  },
  {
    id: 'crs_3',
    code: 'B.TECH MECH',
    title: 'Mechanical Engineering',
    description: 'Focus on Thermal Dynamics, Mechatronics, CAD/CAM Manufacturing, and Robotics.',
    credits: 158,
    semester: '8 Semesters',
    enrolledStudents: 140,
  },
];

const SEED_SUBJECTS = [
  { id: 'sub_1', code: 'CS301', name: 'Data Structures & Algorithms', faculty: 'Prof. Sarah Jenkins', credits: 4, type: 'Core Theory + Lab' },
  { id: 'sub_2', code: 'CS302', name: 'Computer Networks & Protocols', faculty: 'Dr. Arthur Pendelton', credits: 3, type: 'Theory' },
  { id: 'sub_3', code: 'CS303', name: 'Operating Systems Internals', faculty: 'Dr. Elena Rostova', credits: 4, type: 'Core Theory + Lab' },
  { id: 'sub_4', code: 'CS304', name: 'Relational & NoSQL Database Systems', faculty: 'Prof. Mark Davis', credits: 4, type: 'Core Theory + Lab' },
  { id: 'sub_5', code: 'CS305', name: 'Software Engineering Methodologies', faculty: 'Dr. Arthur Pendelton', credits: 3, type: 'Theory' },
];

const SEED_RESULTS = [
  { id: 'res_1', studentName: 'Alex Rivera', rollNumber: 'CS2023-001', subject: 'Data Structures', marks: 94, totalMarks: 100, grade: 'A+', semester: '5th Sem' },
  { id: 'res_2', studentName: 'Alex Rivera', rollNumber: 'CS2023-001', subject: 'Computer Networks', marks: 88, totalMarks: 100, grade: 'A', semester: '5th Sem' },
  { id: 'res_3', studentName: 'Sophia Patel', rollNumber: 'CS2023-002', subject: 'Data Structures', marks: 96, totalMarks: 100, grade: 'A+', semester: '5th Sem' },
  { id: 'res_4', studentName: 'Marcus Chen', rollNumber: 'EE2023-014', subject: 'Signals & Systems', marks: 78, totalMarks: 100, grade: 'B', semester: '4th Sem' },
];

export const ManageCourses = () => {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'subjects', 'timetable', 'results'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Curriculum &amp; Academic Programs
          </h1>
          <p className="text-xs text-slate-500">
            Manage degree programs, syllabus offerings, lecture timetables, and semester marks.
          </p>
        </div>
      </div>

      {/* Tabs bar */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/60 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('courses')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'courses' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> Degree Programs
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'subjects' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Subject Directory
        </button>
        <button
          onClick={() => setActiveTab('timetable')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'timetable' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5" /> Master Timetable
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'results' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" /> Exam Marks Ledger
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'courses' && <CourseList courses={SEED_COURSES} />}
      {activeTab === 'subjects' && <SubjectList subjects={SEED_SUBJECTS} />}
      {activeTab === 'timetable' && <Timetable />}
      {activeTab === 'results' && <ResultTable results={SEED_RESULTS} />}
    </div>
  );
};

export default ManageCourses;
