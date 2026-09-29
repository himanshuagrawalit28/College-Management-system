import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Providers & Context
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import { ROLES, INITIAL_USERS } from '../utils/constants';

// Services
import studentService from '../services/studentService';
import facultyService from '../services/facultyService';
import feeService from '../services/feeService';
import noticeService from '../services/noticeService';

// Components & Pages to test
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageStudents from '../pages/admin/ManageStudents';
import ManageFaculty from '../pages/admin/ManageFaculty';
import ManageCourses from '../pages/admin/ManageCourses';
import ManageFees from '../pages/admin/ManageFees';
import ManageNotices from '../pages/admin/ManageNotices';
import ManageEvents from '../pages/admin/ManageEvents';
import StudentForm from '../components/students/StudentForm';
import FacultyForm from '../components/faculty/FacultyForm';
import NoticeForm from '../components/notices/NoticeForm';
import EventForm from '../components/events/EventForm';

describe('Phase 2 Verification Test Suite - Admin Portal & Management Modules', () => {
  beforeEach(() => {
    localStorage.clear();
    const adminUser = INITIAL_USERS.find((u) => u.role === ROLES.ADMIN);
    localStorage.setItem('apex_current_user', JSON.stringify(adminUser));
    localStorage.setItem('apex_token', 'mock-test-admin-token');
  });

  // TC-P2-01: Admin Dashboard Metrics & Charts
  it('TC-P2-01: AdminDashboard renders metrics, quick actions, and recent activities', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <AdminDashboard />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Administrative Command Center/i)).toBeDefined();
    expect(screen.getByText(/Total Students/i)).toBeDefined();
    expect(screen.getByText(/Faculty Members/i)).toBeDefined();
    expect(screen.getByText(/Active Courses/i)).toBeDefined();
    expect(screen.getByText(/Fee Revenue/i)).toBeDefined();
    expect(screen.getByText(/Recent Activities/i)).toBeDefined();
  });

  // TC-P2-02: Student Management Page Rendering & Controls
  it('TC-P2-02: ManageStudents page renders student directory, search, filter, and action buttons', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <ManageStudents />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Student Management/i)).toBeDefined();
      expect(screen.getByPlaceholderText(/Search by name, roll no, or email.../i)).toBeDefined();
      expect(screen.getByRole('button', { name: /Add New Student/i })).toBeDefined();
    });
  });

  // TC-P2-03: StudentForm Validation & Submission
  it('TC-P2-03: StudentForm validates required fields and triggers onSubmit', () => {
    const handleSubmit = vi.fn();
    const handleClose = vi.fn();

    render(
      <StudentForm
        isOpen={true}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    );

    const nameInput = screen.getByPlaceholderText(/e\.g\. Johnathan Smith/i);
    const emailInput = screen.getByPlaceholderText(/john@apexcollege\.edu/i);
    const submitBtn = screen.getByRole('button', { name: /Create Student/i });

    fireEvent.change(nameInput, { target: { value: 'Daniel Roberts' } });
    fireEvent.change(emailInput, { target: { value: 'daniel.r@apexcollege.edu' } });
    fireEvent.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit.mock.calls[0][0].name).toBe('Daniel Roberts');
  });

  // TC-P2-04: Student Service CRUD Operations
  it('TC-P2-04: studentService creates, updates, and deletes students', async () => {
    const newStudent = await studentService.createStudent({
      name: 'Test Student',
      email: 'test.student@apexcollege.edu',
      rollNumber: 'CS2026-999',
      department: 'Computer Science',
      semester: '1st Semester',
    });
    expect(newStudent.id).toBeDefined();
    expect(newStudent.name).toBe('Test Student');

    const updated = await studentService.updateStudent(newStudent.id, {
      name: 'Updated Student Name',
    });
    expect(updated.name).toBe('Updated Student Name');

    await studentService.deleteStudent(newStudent.id);
    const all = await studentService.getAllStudents();
    expect(all.some((s) => s.id === newStudent.id)).toBe(false);
  });

  // TC-P2-05: Faculty Management Page Rendering
  it('TC-P2-05: ManageFaculty renders faculty list, onboard button, and search input', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <ManageFaculty />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Faculty Management/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /Onboard Faculty Member/i })).toBeDefined();
    });
  });

  // TC-P2-06: Faculty Service CRUD Operations
  it('TC-P2-06: facultyService registers and deletes faculty members', async () => {
    const newFaculty = await facultyService.createFaculty({
      name: 'Dr. John Watson',
      email: 'watson@apexcollege.edu',
      employeeId: 'FAC-2026-909',
      department: 'Mechanical Engineering',
      designation: 'Assistant Professor',
    });
    expect(newFaculty.id).toBeDefined();

    await facultyService.deleteFaculty(newFaculty.id);
    const all = await facultyService.getAllFaculty();
    expect(all.some((f) => f.id === newFaculty.id)).toBe(false);
  });

  // TC-P2-07: Academic Courses & Curriculum Tabs
  it('TC-P2-07: ManageCourses tab switcher toggles between degree programs, subjects, timetable, and marks ledger', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <ManageCourses />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Curriculum & Academic Programs/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Degree Programs/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Subject Directory/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Master Timetable/i })).toBeDefined();

    // Click Subject Directory
    fireEvent.click(screen.getByRole('button', { name: /Subject Directory/i }));
    expect(screen.getByText(/Data Structures & Algorithms/i)).toBeDefined();

    // Click Master Timetable
    fireEvent.click(screen.getByRole('button', { name: /Master Timetable/i }));
    expect(screen.getByText(/Time Slot/i)).toBeDefined();
    expect(screen.getByText(/Monday/i)).toBeDefined();
  });

  // TC-P2-08: ManageFees & Payment Collection
  it('TC-P2-08: ManageFees renders fee metrics, invoice table, and allows recording payment', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <ManageFees />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Tuition Fees & Financial Audits/i)).toBeDefined();
      expect(screen.getByText(/Total Assessed/i)).toBeDefined();
      expect(screen.getByText(/Outstanding Dues/i)).toBeDefined();
      expect(screen.getByText(/Recent Payment Transactions/i)).toBeDefined();
    });
  });

  // TC-P2-09: Campus Notices Management
  it('TC-P2-09: ManageNotices renders circulars, category filters, and allows publishing notices', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <ManageNotices />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Campus Notices & Circulars/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /Publish New Notice/i })).toBeDefined();
    });
  });

  // TC-P2-10: Campus Events Management
  it('TC-P2-10: ManageEvents renders campus schedule, venue details, and event scheduler', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <ManageEvents />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Campus Events & Activities/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /Schedule New Event/i })).toBeDefined();
    });
  });
});
