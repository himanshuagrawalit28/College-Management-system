import { getStorageItem, setStorageItem } from '../utils/helpers';

const STORAGE_STUDENTS_KEY = 'apex_students_list';

const SEED_STUDENTS = [
  {
    id: 'std_1',
    rollNumber: 'CS2023-001',
    name: 'Alex Rivera',
    email: 'student@apexcollege.edu',
    department: 'Computer Science',
    semester: '6th Semester',
    batchYear: '2023-2027',
    cgpa: 3.84,
    attendanceRate: 92,
    status: 'Active',
    phone: '+1 (555) 438-9902',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'std_2',
    rollNumber: 'CS2023-002',
    name: 'Sophia Patel',
    email: 'sophia.p@apexcollege.edu',
    department: 'Computer Science',
    semester: '6th Semester',
    batchYear: '2023-2027',
    cgpa: 3.92,
    attendanceRate: 96,
    status: 'Active',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'std_3',
    rollNumber: 'EE2023-014',
    name: 'Marcus Chen',
    email: 'marcus.c@apexcollege.edu',
    department: 'Electrical Engineering',
    semester: '4th Semester',
    batchYear: '2024-2028',
    cgpa: 3.45,
    attendanceRate: 84,
    status: 'Active',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'std_4',
    rollNumber: 'ME2022-009',
    name: 'Emily Watson',
    email: 'emily.w@apexcollege.edu',
    department: 'Mechanical Engineering',
    semester: '8th Semester',
    batchYear: '2022-2026',
    cgpa: 3.71,
    attendanceRate: 89,
    status: 'Active',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
  }
];

if (!getStorageItem(STORAGE_STUDENTS_KEY, null)) {
  setStorageItem(STORAGE_STUDENTS_KEY, SEED_STUDENTS);
}

export const studentService = {
  getAllStudents: async () => {
    return getStorageItem(STORAGE_STUDENTS_KEY, SEED_STUDENTS);
  },
  getStudentById: async (id) => {
    const list = getStorageItem(STORAGE_STUDENTS_KEY, SEED_STUDENTS);
    return list.find((s) => s.id === id || s.rollNumber === id);
  },
  createStudent: async (data) => {
    const list = getStorageItem(STORAGE_STUDENTS_KEY, SEED_STUDENTS);
    const newStudent = {
      id: `std_${Date.now()}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'Active',
      cgpa: 0.0,
      attendanceRate: 100,
      ...data,
    };
    setStorageItem(STORAGE_STUDENTS_KEY, [newStudent, ...list]);
    return newStudent;
  },
  updateStudent: async (id, data) => {
    const list = getStorageItem(STORAGE_STUDENTS_KEY, SEED_STUDENTS);
    const updated = list.map((s) => (s.id === id ? { ...s, ...data } : s));
    setStorageItem(STORAGE_STUDENTS_KEY, updated);
    return updated.find((s) => s.id === id);
  },
  deleteStudent: async (id) => {
    const list = getStorageItem(STORAGE_STUDENTS_KEY, SEED_STUDENTS);
    const updated = list.filter((s) => s.id !== id);
    setStorageItem(STORAGE_STUDENTS_KEY, updated);
    return true;
  }
};

export default studentService;
