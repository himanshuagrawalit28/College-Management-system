import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Providers & Context
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import { ROLES, INITIAL_USERS } from '../utils/constants';

// Pages to test
import StudentDashboard from '../pages/student/StudentDashboard';
import MyProfile from '../pages/student/MyProfile';
import MyAttendance from '../pages/student/MyAttendance';
import MyResults from '../pages/student/MyResults';
import MyFees from '../pages/student/MyFees';
import MyTimetable from '../pages/student/MyTimetable';
import StudentNotices from '../pages/student/StudentNotices';

describe('Phase 4 Verification Test Suite - Student Portal & End-to-End Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    const studentUser = INITIAL_USERS.find((u) => u.role === ROLES.STUDENT);
    localStorage.setItem('apex_current_user', JSON.stringify(studentUser));
    localStorage.setItem('apex_token', 'mock-test-student-token');
  });

  // TC-P4-01: Student Dashboard Rendering
  it('TC-P4-01: StudentDashboard renders student identity, CGPA, attendance gauge, and class schedule', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <StudentDashboard />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Student Self-Service Portal/i)).toBeDefined();
    expect(screen.getByText(/Current CGPA/i)).toBeDefined();
    expect(screen.getAllByText(/Attendance Rate/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Today's Class Schedule/i)).toBeDefined();
    expect(screen.getAllByText(/CS301: Data Structures/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Exam Eligibility Verified/i)).toBeDefined();
  });

  // TC-P4-02: Student Profile Details & Contact Form
  it('TC-P4-02: MyProfile renders student credentials, credits, and allows editing contact details', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <MyProfile />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/My Student Profile/i)).toBeDefined();
    expect(screen.getAllByText(/CS2023-018/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Credits Earned/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Edit Contact Details/i })).toBeDefined();

    // Toggle edit
    fireEvent.click(screen.getByRole('button', { name: /Edit Contact Details/i }));
    expect(screen.getByRole('button', { name: /Save Contact Info/i })).toBeDefined();
  });

  // TC-P4-03: Subject-wise Attendance & Eligibility Check
  it('TC-P4-03: MyAttendance displays overall rate, subject compliance bars, and exam eligibility', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <MyAttendance />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/My Attendance Record/i)).toBeDefined();
    expect(screen.getByText(/Overall Academic Attendance Rate/i)).toBeDefined();
    expect(screen.getByText(/Eligible for End-Semester Examinations/i)).toBeDefined();
    expect(screen.getByText(/Subject-wise Attendance Distribution/i)).toBeDefined();
    expect(screen.getByText(/Operating Systems Internals/i)).toBeDefined();
  });

  // TC-P4-04: Examination Results & SGPA Calculation
  it('TC-P4-04: MyResults displays semester SGPA, cumulative CGPA, and official grade ledger', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <MyResults />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Academic Transcripts & Grades/i)).toBeDefined();
    expect(screen.getAllByText(/Semester SGPA/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cumulative CGPA/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Download Official Grade Sheet/i })).toBeDefined();
    expect(screen.getByText(/Data Structures & Algorithms/i)).toBeDefined();
  });

  // TC-P4-05: Student Fees & Online Payment Receipt
  it('TC-P4-05: MyFees displays fee breakdown and allows viewing official receipt', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <MyFees />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Tuition Fees & Payments/i)).toBeDefined();
    expect(screen.getByText(/Total Fee Assessed/i)).toBeDefined();
    expect(screen.getByText(/Semester Fee Component Breakdown/i)).toBeDefined();

    // View receipt
    const viewReceiptBtns = screen.getAllByRole('button', { name: /View Receipt/i });
    expect(viewReceiptBtns.length).toBeGreaterThan(0);
    fireEvent.click(viewReceiptBtns[0]);

    expect(screen.getByText(/Official Fee Payment Receipt/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Print Receipt/i })).toBeDefined();
  });

  // TC-P4-06: Student Timetable Schedule
  it('TC-P4-06: MyTimetable renders weekly lectures, room numbers, and contact hours', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <MyTimetable />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/My Academic Schedule & Lecture Halls/i)).toBeDefined();
    expect(screen.getByText(/22 Hours \/ Week/i)).toBeDefined();
    expect(screen.getByText(/Computer Science Block/i)).toBeDefined();
    expect(screen.getByText(/Time Slot/i)).toBeDefined();
  });

  // TC-P4-07: Student Notices Bulletin
  it('TC-P4-07: StudentNotices displays official announcements and search filter', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <StudentNotices />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Official Campus Notices & Bulletins/i)).toBeDefined();
      expect(screen.getByPlaceholderText(/Search circulars.../i)).toBeDefined();
    });
  });
});
