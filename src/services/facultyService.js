import { getStorageItem, setStorageItem } from '../utils/helpers';

const STORAGE_FACULTY_KEY = 'apex_faculty_list';

const SEED_FACULTY = [
  {
    id: 'fac_1',
    employeeId: 'FAC-2023-042',
    name: 'Prof. Sarah Jenkins',
    email: 'faculty@apexcollege.edu',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    phone: '+1 (555) 839-1123',
    experience: '8 Years',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    subjects: ['Data Structures & Algorithms', 'Cloud Computing Architecture']
  },
  {
    id: 'fac_2',
    employeeId: 'FAC-2021-019',
    name: 'Dr. Arthur Pendelton',
    email: 'arthur.p@apexcollege.edu',
    department: 'Electrical Engineering',
    designation: 'Head of Department',
    phone: '+1 (555) 782-4411',
    experience: '14 Years',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    subjects: ['Signals & Systems', 'Digital Logic Design']
  },
  {
    id: 'fac_3',
    employeeId: 'FAC-2022-031',
    name: 'Dr. Elena Rostova',
    email: 'elena.r@apexcollege.edu',
    department: 'Computer Science & Engineering',
    designation: 'Assistant Professor',
    phone: '+1 (555) 612-9903',
    experience: '5 Years',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    subjects: ['Artificial Intelligence', 'Natural Language Processing']
  }
];

if (!getStorageItem(STORAGE_FACULTY_KEY, null)) {
  setStorageItem(STORAGE_FACULTY_KEY, SEED_FACULTY);
}

export const facultyService = {
  getAllFaculty: async () => {
    return getStorageItem(STORAGE_FACULTY_KEY, SEED_FACULTY);
  },
  createFaculty: async (data) => {
    const list = getStorageItem(STORAGE_FACULTY_KEY, SEED_FACULTY);
    const newFaculty = {
      id: `fac_${Date.now()}`,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      subjects: [],
      ...data,
    };
    setStorageItem(STORAGE_FACULTY_KEY, [newFaculty, ...list]);
    return newFaculty;
  },
  deleteFaculty: async (id) => {
    const list = getStorageItem(STORAGE_FACULTY_KEY, SEED_FACULTY);
    const updated = list.filter((f) => f.id !== id);
    setStorageItem(STORAGE_FACULTY_KEY, updated);
    return true;
  }
};

export default facultyService;
