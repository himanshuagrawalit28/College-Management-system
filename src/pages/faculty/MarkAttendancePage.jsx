import React, { useState, useEffect } from 'react';
import attendanceService from '../../services/attendanceService';
import MarkAttendance from '../../components/attendance/MarkAttendance';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import AttendanceReport from '../../components/attendance/AttendanceReport';
import Loader from '../../components/common/Loader';
import { CalendarCheck, History, BarChart2 } from 'lucide-react';

export const MarkAttendancePage = () => {
  const [activeTab, setActiveTab] = useState('mark'); // 'mark', 'logs', 'report'
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await attendanceService.getRecords();
      setRecords(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleSaveRecord = async (record) => {
    await attendanceService.markAttendance(record);
    fetchRecords();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Lecture Attendance Hub
          </h1>
          <p className="text-xs text-slate-500">
            Record class roll calls, track lecture logs, and monitor student eligibility.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/60 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('mark')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'mark'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5" /> Mark Today's Class
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'logs'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <History className="w-3.5 h-3.5" /> Lecture Logs
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'report'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" /> Cumulative Report
        </button>
      </div>

      {loading ? (
        <Loader text="Loading attendance data..." />
      ) : (
        <>
          {activeTab === 'mark' && <MarkAttendance onSaveAttendance={handleSaveRecord} />}
          {activeTab === 'logs' && <AttendanceTable records={records} />}
          {activeTab === 'report' && <AttendanceReport />}
        </>
      )}
    </div>
  );
};

export default MarkAttendancePage;
