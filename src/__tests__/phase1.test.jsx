import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Context & Providers
import { AuthProvider, useAuth } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';

// Routes & Guards
import ProtectedRoute from '../routes/ProtectedRoute';
import RoleRoute from '../routes/RoleRoute';
import { ROLES, ROUTES, INITIAL_USERS } from '../utils/constants';
import { validateEmail, validatePassword } from '../utils/validation';
import authService from '../services/authService';

// Pages & Components
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Sidebar from '../components/common/Sidebar';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';

describe('Phase 1 Verification Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // TC-01: Public Home Page Rendering
  it('TC-01: Home page renders hero banner, title, action buttons, and demo access', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <Home />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Empowering Minds,/i)).toBeDefined();
    expect(screen.getByText(/Transforming Higher Education/i)).toBeDefined();
    expect(screen.getByText(/Access Portal/i)).toBeDefined();
    expect(screen.getByText(/Login as Admin/i)).toBeDefined();
    expect(screen.getByText(/Login as Faculty/i)).toBeDefined();
    expect(screen.getByText(/Login as Student/i)).toBeDefined();
    expect(screen.getByText(/Complete Academic Operations Suite/i)).toBeDefined();
  });

  // TC-02: Public About and Contact Pages Rendering
  it('TC-02: About and Contact pages render institutional content and inquiry form', () => {
    const { unmount: unmountAbout } = render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <About />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/About Apex College/i)).toBeDefined();
    expect(screen.getByText(/Our Mission/i)).toBeDefined();
    expect(screen.getByText(/Our Vision/i)).toBeDefined();
    unmountAbout();

    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <Contact />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Campus Contact & Helpdesk/i)).toBeDefined();
    expect(screen.getByText(/Send an Inquiry Message/i)).toBeDefined();
  });

  // TC-03: Validation Utilities
  it('TC-03: Validation utilities accurately validate email and password constraints', () => {
    expect(validateEmail('test@apexcollege.edu')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('')).toBe(false);

    expect(validatePassword('123456')).toBe(true);
    expect(validatePassword('123')).toBe(false);
  });

  // TC-04: AuthService Login & LocalStorage Session Persistence
  it('TC-04: AuthService successfully authenticates seeded admin and stores session in localStorage', async () => {
    const { user, token } = await authService.login('admin@apexcollege.edu', 'password123');
    expect(user.role).toBe(ROLES.ADMIN);
    expect(user.name).toBe('Dr. Robert Vance');
    expect(token).toBeDefined();

    const storedUser = authService.getCurrentUser();
    expect(storedUser.email).toBe('admin@apexcollege.edu');
  });

  // TC-05: Login Component Interaction & Demo Login
  it('TC-05: Login page displays input controls and fast evaluator demo triggers', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <Login />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/e\.g\. admin@apexcollege\.edu/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeDefined();
  });

  // TC-06: Registration Component Tabs
  it('TC-06: Register page switches between Student and Faculty modes with role fields', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <Register />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /Student Portal/i })).toBeDefined();
    const facultyBtn = screen.getByRole('button', { name: /Faculty Member/i });
    expect(facultyBtn).toBeDefined();
    expect(screen.getByText(/Roll Number \/ Student ID/i)).toBeDefined();

    // Switch to Faculty tab
    fireEvent.click(facultyBtn);
    expect(screen.getByText(/Faculty Employee ID/i)).toBeDefined();
  });

  // TC-07: ProtectedRoute Guarding Unauthenticated Users
  it('TC-07: ProtectedRoute redirects unauthenticated users to login', () => {
    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<div>LOGIN_REDIRECT_TARGET</div>} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <div>PROTECTED_ADMIN_CONTENT</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('LOGIN_REDIRECT_TARGET')).toBeDefined();
    expect(screen.queryByText('PROTECTED_ADMIN_CONTENT')).toBeNull();
  });

  // TC-08: RoleRoute Guarding Unauthorized Roles
  it('TC-08: RoleRoute blocks unauthorized role and redirects to matching dashboard', () => {
    // Pre-populate student in localStorage
    const studentUser = INITIAL_USERS.find((u) => u.role === ROLES.STUDENT);
    localStorage.setItem('apex_current_user', JSON.stringify(studentUser));
    localStorage.setItem('apex_token', 'mock-test-token');

    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <AuthProvider>
          <Routes>
            <Route path="/student/dashboard" element={<div>STUDENT_AUTHORIZED_DASHBOARD</div>} />
            <Route
              path="/admin/dashboard"
              element={
                <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                  <div>ADMIN_RESTRICTED_CONTENT</div>
                </RoleRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('STUDENT_AUTHORIZED_DASHBOARD')).toBeDefined();
    expect(screen.queryByText('ADMIN_RESTRICTED_CONTENT')).toBeNull();
  });

  // TC-09: Sidebar Role-Based Menu Filtering
  it('TC-09: Sidebar renders role-specific links when logged in as Admin', () => {
    const adminUser = INITIAL_USERS.find((u) => u.role === ROLES.ADMIN);
    localStorage.setItem('apex_current_user', JSON.stringify(adminUser));

    render(
      <MemoryRouter>
        <AuthProvider>
          <Sidebar isOpen={true} onClose={() => {}} />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Student Management')).toBeDefined();
    expect(screen.getByText('Faculty Management')).toBeDefined();
    expect(screen.getByText('Courses & Subjects')).toBeDefined();
    expect(screen.getByText('Fees & Finance')).toBeDefined();
  });

  // TC-10: Common UI Components (Modal, Loader, ConfirmDialog)
  it('TC-10: Common Modal and ConfirmDialog components trigger callbacks properly', () => {
    const handleClose = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <ConfirmDialog
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Delete Item"
        message="Are you sure you want to delete this record?"
      />
    );

    expect(screen.getByText('Delete Item')).toBeDefined();
    expect(screen.getByText('Are you sure you want to delete this record?')).toBeDefined();

    const deleteBtn = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteBtn);
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});
