import { getStorageItem, setStorageItem } from '../utils/helpers';

const STORAGE_RESULTS_KEY = 'apex_exam_results';

const SEED_RESULTS = [
  { id: 'res_1', studentName: 'Alex Rivera', rollNumber: 'CS2023-001', subject: 'Data Structures', marks: 94, totalMarks: 100, grade: 'A+', semester: '5th Sem' },
  { id: 'res_2', studentName: 'Alex Rivera', rollNumber: 'CS2023-001', subject: 'Computer Networks', marks: 88, totalMarks: 100, grade: 'A', semester: '5th Sem' },
  { id: 'res_3', studentName: 'Alex Rivera', rollNumber: 'CS2023-001', subject: 'Database Systems', marks: 91, totalMarks: 100, grade: 'A+', semester: '5th Sem' },
  { id: 'res_4', studentName: 'Sophia Patel', rollNumber: 'CS2023-002', subject: 'Data Structures', marks: 96, totalMarks: 100, grade: 'A+', semester: '5th Sem' },
];

if (!getStorageItem(STORAGE_RESULTS_KEY, null)) {
  setStorageItem(STORAGE_RESULTS_KEY, SEED_RESULTS);
}

export const resultService = {
  getResults: async (rollNumber) => {
    const list = getStorageItem(STORAGE_RESULTS_KEY, SEED_RESULTS);
    if (rollNumber) {
      return list.filter((r) => r.rollNumber === rollNumber);
    }
    return list;
  },
  addResult: async (data) => {
    const list = getStorageItem(STORAGE_RESULTS_KEY, SEED_RESULTS);
    const newResult = {
      id: `res_${Date.now()}`,
      ...data,
    };
    setStorageItem(STORAGE_RESULTS_KEY, [newResult, ...list]);
    return newResult;
  }
};

export default resultService;
