export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const getStorageItem = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Storage error:', err);
  }
};

export const calculateGrade = (percentage) => {
  if (percentage >= 90) return { grade: 'A+', gpa: 4.0, color: 'text-emerald-600' };
  if (percentage >= 80) return { grade: 'A', gpa: 3.7, color: 'text-emerald-500' };
  if (percentage >= 70) return { grade: 'B', gpa: 3.0, color: 'text-indigo-600' };
  if (percentage >= 60) return { grade: 'C', gpa: 2.0, color: 'text-amber-600' };
  if (percentage >= 50) return { grade: 'D', gpa: 1.0, color: 'text-orange-600' };
  return { grade: 'F', gpa: 0.0, color: 'text-rose-600' };
};
