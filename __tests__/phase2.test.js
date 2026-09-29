import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../server.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import Course from '../models/Course.js';
import Subject from '../models/Subject.js';

dotenv.config();

describe('Backend Phase 2 Test Suite - Administrative Management APIs', () => {
  let adminToken = '';
  let facultyToken = '';
  let studentToken = '';
  let sampleCourseId = '';
  let sampleStudentId = '';
  let sampleFacultyId = '';
  let createdTestStudentId = '';

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college_management';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }

    // Authenticate Admin
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@apexcollege.edu', password: 'password123' });
    adminToken = adminRes.body.token;

    // Authenticate Faculty
    const facultyRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'faculty@apexcollege.edu', password: 'password123' });
    facultyToken = facultyRes.body.token;

    // Authenticate Student
    const studentRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@apexcollege.edu', password: 'password123' });
    studentToken = studentRes.body.token;

    // Cache sample IDs for tests
    const course = await Course.findOne({ courseCode: 'BTECH-CSE' });
    if (course) sampleCourseId = course._id.toString();

    const student = await Student.findOne({ studentId: 'STU-2023-018' });
    if (student) sampleStudentId = student._id.toString();

    const faculty = await Faculty.findOne({ facultyId: 'FAC-2023-042' });
    if (faculty) sampleFacultyId = faculty._id.toString();
  });

  afterAll(async () => {
    // Cleanup any temporary created student
    if (createdTestStudentId) {
      await Student.findByIdAndDelete(createdTestStudentId);
    }
    await User.deleteMany({ email: /test.*@example\.com/ });
    await mongoose.connection.close();
  });

  // TC-B2-01: Admin can retrieve list of all students
  it('TC-B2-01: GET /api/students returns student list with pagination for admin', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.students)).toBe(true);
    expect(res.body.students.length).toBeGreaterThan(0);
    expect(res.body.students[0].user).toBeDefined();
  });

  // TC-B2-02: Search filtering
  it('TC-B2-02: GET /api/students?keyword=CS2023-018 filters accurately by rollNo', async () => {
    const res = await request(app)
      .get('/api/students?keyword=CS2023-018')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.students.length).toBeGreaterThan(0);
    expect(res.body.students[0].rollNo).toBe('CS2023-018');
  });

  // TC-B2-03: Create new student by Admin
  it('TC-B2-03: POST /api/students successfully creates a new student record and user account', async () => {
    const timestamp = Date.now();
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Phase2 Test Student',
        email: `test.student.${timestamp}@example.com`,
        studentId: `STU-TEST-${timestamp.toString().slice(-4)}`,
        rollNo: `ROLL-${timestamp.toString().slice(-4)}`,
        department: 'Computer Science & Engineering',
        semester: 3,
        course: sampleCourseId,
        courseName: 'B.Tech CSE',
        phone: '+1 (555) 999-1234',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.student).toBeDefined();
    expect(res.body.student.studentId).toMatch(/^STU-TEST-/);
    createdTestStudentId = res.body.student._id;
  });

  // TC-B2-04: Non-admin (Student) RBAC restriction
  it('TC-B2-04: POST /api/students rejects non-admin users with 403 Forbidden', async () => {
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        name: 'Unauthorized Student',
        email: 'unauth@example.com',
        studentId: 'STU-UNAUTH',
        rollNo: 'UNAUTH-01',
        department: 'Computer Science',
      });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  // TC-B2-05: Update student details
  it('TC-B2-05: PUT /api/students/:id updates student information', async () => {
    const res = await request(app)
      .put(`/api/students/${sampleStudentId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        address: 'Updated Apartment 4B, Campus View',
        guardianName: 'Carlos Rivera Senior',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.student.guardianName).toBe('Carlos Rivera Senior');
    expect(res.body.student.address).toBe('Updated Apartment 4B, Campus View');
  });

  // TC-B2-06: Student Statistics
  it('TC-B2-06: GET /api/students/stats/overview returns aggregate student counts', async () => {
    const res = await request(app)
      .get('/api/students/stats/overview')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.total).toBeGreaterThan(0);
    expect(res.body.active).toBeGreaterThan(0);
  });

  // TC-B2-07: Faculty listing
  it('TC-B2-07: GET /api/faculty returns faculty list with assigned subjects', async () => {
    const res = await request(app)
      .get('/api/faculty')
      .set('Authorization', `Bearer ${facultyToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.faculty)).toBe(true);
    expect(res.body.faculty.length).toBeGreaterThan(0);
    expect(res.body.faculty[0].facultyId).toBeDefined();
  });

  // TC-B2-08: Admin creates new faculty member
  it('TC-B2-08: POST /api/faculty creates new faculty profile and user credentials', async () => {
    const timestamp = Date.now();
    const res = await request(app)
      .post('/api/faculty')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Dr. Gregory House',
        email: `test.faculty.${timestamp}@example.com`,
        facultyId: `FAC-${timestamp.toString().slice(-4)}`,
        department: 'Computer Science & Engineering',
        designation: 'Professor',
        qualification: 'Ph.D. in Artificial Intelligence',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.faculty.department).toBe('Computer Science & Engineering');
  });

  // TC-B2-09: Course and Subject retrieval
  it('TC-B2-09: GET /api/courses and GET /api/courses/:id returns program curriculum', async () => {
    const listRes = await request(app)
      .get('/api/courses')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(listRes.status).toBe(200);
    expect(listRes.body.courses.length).toBeGreaterThan(0);

    const singleRes = await request(app)
      .get(`/api/courses/${sampleCourseId}`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(singleRes.status).toBe(200);
    expect(singleRes.body.course.courseCode).toBe('BTECH-CSE');
    expect(Array.isArray(singleRes.body.subjects)).toBe(true);
  });

  // TC-B2-10: Subject creation
  it('TC-B2-10: POST /api/courses/subjects creates new academic subject under course', async () => {
    const timestamp = Date.now();
    const res = await request(app)
      .post('/api/courses/subjects')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        subjectCode: `SUB-${timestamp.toString().slice(-4)}`,
        subjectName: 'Cloud Computing & DevOps',
        course: sampleCourseId,
        semester: 6,
        credits: 3,
        department: 'Computer Science & Engineering',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.subject.subjectName).toBe('Cloud Computing & DevOps');
  });

  // TC-B2-11: Delete student record
  it('TC-B2-11: DELETE /api/students/:id removes student profile from database', async () => {
    if (createdTestStudentId) {
      const res = await request(app)
        .delete(`/api/students/${createdTestStudentId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toMatch(/removed successfully/i);
    }
  });
});
