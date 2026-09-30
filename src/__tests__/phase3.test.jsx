import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Providers & Context
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import { ROLES, INITIAL_USERS } from '../utils/constants';

// Services
import attendanceService from '../services/attendanceService';
import resultService from '../services/resultService';

// Pages & Components to test
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import FacultyProfile from '../pages/faculty/FacultyProfile';
import MarkAttendancePage from '../pages/faculty/MarkAttendancePage';
import ManageResults from '../pages/faculty/ManageResults';
import FacultyTimetable from '../pages/faculty/FacultyTimetable';
import MarkAttendance from '../components/attendance/MarkAttendance';
import AttendanceReport from '../components/attendance/AttendanceReport';

describe('Phase 3 Verification Test Suite - Faculty Portal', () => {
  beforeEach(() => {
    localStorage.clear();
    const facultyUser = INITIAL_USERS.find((u) => u.role === ROLES.FACULTY);
    localStorage.setItem('apex_current_user', JSON.stringify(facultyUser));
    localStorage.setItem('apex_token', 'mock-test-faculty-token');
  });

  // TC-P3-01: Faculty Dashboard Rendering
  it('TC-P3-01: FacultyDashboard renders educator banner, metrics, and today\'s schedule', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <FacultyDashboard />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Faculty Academic Studio/i)).toBeDefined();
    expect(screen.getByText(/Assigned Subjects/i)).toBeDefined();
    expect(screen.getByText(/Enrolled Students/i)).toBeDefined();
    expect(screen.getByText(/Today's Teaching Schedule/i)).toBeDefined();
    expect(screen.getByText(/CS301: Data Structures/i)).toBeDefined();
  });

  // TC-P3-02: MarkAttendancePage Tabs
  it('TC-P3-02: MarkAttendancePage toggles between Mark Class, Lecture Logs, and Cumulative Report', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <MarkAttendancePage />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Mark Today's Class/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /Lecture Logs/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /Cumulative Report/i })).toBeDefined();
    });

    // Switch to Lecture Logs
    fireEvent.click(screen.getByRole('button', { name: /Lecture Logs/i }));
    expect(screen.getByText(/Past Lecture Attendance Logs/i)).toBeDefined();

    // Switch to Cumulative Report
    fireEvent.click(screen.getByRole('button', { name: /Cumulative Report/i }));
    expect(screen.getByText(/Cumulative Student Attendance Breakdown/i)).toBeDefined();
  });

  // TC-P3-03: MarkAttendance Component Interactions
  it('TC-P3-03: MarkAttendance calculates attendance ratio and toggles batch presence', () => {
    const handleSave = vi.fn();
    render(<MarkAttendance onSaveAttendance={handleSave} />);

    expect(screen.getByText(/Daily Attendance Roster/i)).toBeDefined();
    expect(screen.getByText(/CS2023-001/i)).toBeDefined();

    // Batch mark all absent
    const allAbsentBtn = screen.getByRole('button', { name: /All Absent/i });
    fireEvent.click(allAbsentBtn);

    // Percentage should drop to 0.0%
    expect(screen.getByText(/0.0%/i)).toBeDefined();

    // Batch mark all present
    const allPresentBtn = screen.getByRole('button', { name: /All Present/i });
    fireEvent.click(allPresentBtn);

    // Percentage should rise to 100.0%
    expect(screen.getByText(/100.0%/i)).toBeDefined();
  });

  // TC-P3-04: AttendanceService persistence
  it('TC-P3-04: attendanceService stores and returns attendance records', async () => {
    const record = await attendanceService.markAttendance({
      course: 'CS301',
      subject: 'Data Structures',
      totalStudents: 45,
      presentCount: 42,
      percentage: 93.3,
    });
    expect(record.id).toBeDefined();

    const all = await attendanceService.getRecords();
    expect(all.length).toBeGreaterThan(0);
  });

  // TC-P3-05: AttendanceReport Low Attendance Warning
  it('TC-P3-05: AttendanceReport flags students below 75% attendance with ineligibility alerts', () => {
    const mockReport = [
      { roll: 'CS01', name: 'Student High', lecturesHeld: 10, attended: 9, rate: 90.0 },
      { roll: 'CS02', name: 'Student Low', lecturesHeld: 10, attended: 6, rate: 60.0 },
    ];

    render(<AttendanceReport reportData={mockReport} />);

    expect(screen.getByText(/Attendance Shortfall Warning/i)).toBeDefined();
    expect(screen.getByText(/Eligible for Exams/i)).toBeDefined();
    expect(screen.getByText(/Shortfall \(Ineligible\)/i)).toBeDefined();
  });

  // TC-P3-06: ManageResults Page & Score Submission
  it('TC-P3-06: ManageResults displays grade sheet and records new student examination marks', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <ManageResults />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Student Marks & Examination Grading/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Enter Student Marks/i })).toBeDefined();

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Enter Student Marks/i }));
    expect(screen.getByPlaceholderText(/e\.g\. CS2023-010/i)).toBeDefined();

    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. CS2023-010/i), {
      target: { value: 'CS2023-999' },
    });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. Benjamin White/i), {
      target: { value: 'New Tested Student' },
    });
    fireEvent.change(screen.getByPlaceholderText(/85/i), {
      target: { value: '92' },
    });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Record Grade/i }));

    // Verify added to table
    expect(screen.getByText('CS2023-999')).toBeDefined();
    expect(screen.getByText('New Tested Student')).toBeDefined();
  });

  // TC-P3-07: FacultyTimetable Weekly Grid
  it('TC-P3-07: FacultyTimetable renders weekly lectures, hours, and room locations', () => {
    render(<FacultyTimetable />);

    expect(screen.getByText(/Teaching Timetable & Office Hours/i)).toBeDefined();
    expect(screen.getByText(/14 Teaching Hours/i)).toBeDefined();
    expect(screen.getByText(/Room 304, Tech Wing/i)).toBeDefined();
    expect(screen.getByText(/Time Slot/i)).toBeDefined();
  });

  // TC-P3-08: FacultyProfile Details & Editing
  it('TC-P3-08: FacultyProfile renders credentials and toggles contact editing mode', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <FacultyProfile />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Faculty Academic Profile/i)).toBeDefined();
    expect(screen.getByText(/Prof. Sarah Jenkins/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Edit Contact Info/i })).toBeDefined();

    // Toggle edit
    fireEvent.click(screen.getByRole('button', { name: /Edit Contact Info/i }));
    expect(screen.getByRole('button', { name: /Save Profile/i })).toBeDefined();
  });
});
