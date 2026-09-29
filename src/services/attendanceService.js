import { getStorageItem, setStorageItem } from '../utils/helpers';

const STORAGE_ATTENDANCE_KEY = 'apex_attendance_records';

const SEED_ATTENDANCE = [
  { id: 'att_1', date: '2026-09-28', course: 'CS301', subject: 'Data Structures', totalStudents: 45, presentCount: 42, percentage: 93.3 },
  { id: 'att_2', date: '2026-09-27', course: 'CS402', subject: 'Cloud Computing', totalStudents: 38, presentCount: 35, percentage: 92.1 },
  { id: 'att_3', date: '2026-09-26', course: 'CS301', subject: 'Data Structures', totalStudents: 45, presentCount: 41, percentage: 91.1 },
];

if (!getStorageItem(STORAGE_ATTENDANCE_KEY, null)) {
  setStorageItem(STORAGE_ATTENDANCE_KEY, SEED_ATTENDANCE);
}

export const attendanceService = {
  getRecords: async () => {
    return getStorageItem(STORAGE_ATTENDANCE_KEY, SEED_ATTENDANCE);
  },
  markAttendance: async (record) => {
    const records = getStorageItem(STORAGE_ATTENDANCE_KEY, SEED_ATTENDANCE);
    const newRecord = {
      id: `att_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...record,
    };
    setStorageItem(STORAGE_ATTENDANCE_KEY, [newRecord, ...records]);
    return newRecord;
  }
};

export default attendanceService;
