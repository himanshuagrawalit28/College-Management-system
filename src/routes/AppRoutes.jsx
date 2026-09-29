import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROLES, ROUTES } from '../utils/constants';

// Layouts
import AdminLayout from '../layouts/AdminLayout';
import FacultyLayout from '../layouts/FacultyLayout';
import StudentLayout from '../layouts/StudentLayout';

// Guard components
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

// Public pages
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageStudents from '../pages/admin/ManageStudents';
import ManageFaculty from '../pages/admin/ManageFaculty';
import ManageCourses from '../pages/admin/ManageCourses';
import ManageFees from '../pages/admin/ManageFees';
import ManageNotices from '../pages/admin/ManageNotices';
import ManageEvents from '../pages/admin/ManageEvents';

// Faculty pages
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import FacultyProfile from '../pages/faculty/FacultyProfile';
import MarkAttendancePage from '../pages/faculty/MarkAttendancePage';
import ManageResults from '../pages/faculty/ManageResults';
import FacultyTimetable from '../pages/faculty/FacultyTimetable';

// Student pages
import StudentDashboard from '../pages/student/StudentDashboard';
import MyProfile from '../pages/student/MyProfile';
import MyAttendance from '../pages/student/MyAttendance';
import MyResults from '../pages/student/MyResults';
import MyFees from '../pages/student/MyFees';
import MyTimetable from '../pages/student/MyTimetable';
import StudentNotices from '../pages/student/StudentNotices';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.CONTACT} element={<Contact />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

      {/* Admin Module Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="faculty" element={<ManageFaculty />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="fees" element={<ManageFees />} />
        <Route path="notices" element={<ManageNotices />} />
        <Route path="events" element={<ManageEvents />} />
      </Route>

      {/* Faculty Module Routes */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[ROLES.FACULTY]}>
              <FacultyLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.FACULTY_DASHBOARD} replace />} />
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="profile" element={<FacultyProfile />} />
        <Route path="attendance" element={<MarkAttendancePage />} />
        <Route path="results" element={<ManageResults />} />
        <Route path="timetable" element={<FacultyTimetable />} />
      </Route>

      {/* Student Module Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[ROLES.STUDENT]}>
              <StudentLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.STUDENT_DASHBOARD} replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="attendance" element={<MyAttendance />} />
        <Route path="results" element={<MyResults />} />
        <Route path="fees" element={<MyFees />} />
        <Route path="timetable" element={<MyTimetable />} />
        <Route path="notices" element={<StudentNotices />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
