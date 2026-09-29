import { getStorageItem, setStorageItem } from '../utils/helpers';

const STORAGE_FEES_KEY = 'apex_fees_records';

const SEED_FEES = [
  { id: 'fee_1', studentName: 'Alex Rivera', rollNumber: 'CS2023-001', semester: '6th Sem', totalAmount: 4200, paidAmount: 4200, status: 'Paid', dueDate: '2026-09-15' },
  { id: 'fee_2', studentName: 'Sophia Patel', rollNumber: 'CS2023-002', semester: '6th Sem', totalAmount: 4200, paidAmount: 2100, status: 'Partial', dueDate: '2026-10-15' },
  { id: 'fee_3', studentName: 'Marcus Chen', rollNumber: 'EE2023-014', semester: '4th Sem', totalAmount: 3800, paidAmount: 0, status: 'Pending', dueDate: '2026-10-05' },
];

if (!getStorageItem(STORAGE_FEES_KEY, null)) {
  setStorageItem(STORAGE_FEES_KEY, SEED_FEES);
}

export const feeService = {
  getFees: async () => {
    return getStorageItem(STORAGE_FEES_KEY, SEED_FEES);
  },
  recordPayment: async (id, amount) => {
    const list = getStorageItem(STORAGE_FEES_KEY, SEED_FEES);
    const updated = list.map((f) => {
      if (f.id === id) {
        const newPaid = f.paidAmount + amount;
        return {
          ...f,
          paidAmount: newPaid,
          status: newPaid >= f.totalAmount ? 'Paid' : 'Partial'
        };
      }
      return f;
    });
    setStorageItem(STORAGE_FEES_KEY, updated);
    return updated.find((f) => f.id === id);
  }
};

export default feeService;
