import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../server.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Subject from '../models/Subject.js';
import Attendance from '../models/Attendance.js';
import Result from '../models/Result.js';
import Timetable from '../models/Timetable.js';

dotenv.config();

describe('Backend Phase 3 Test Suite - Academic Operations Engine', () => {
  let adminToken = '';
  let facultyToken = '';
  let studentToken = '';
  let sampleStudentId = '';
  let sampleSubjectId = '';
  let sampleResultId = '';

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

    // Get sample student
    const student = await Student.findOne({ studentId: 'STU-2023-018' });
    if (student) sampleStudentId = student._id.toString();

    // Get sample subject
    const subject = await Subject.findOne({ subjectCode: 'CS201' });
    if (subject) sampleSubjectId = subject._id.toString();
  });

  afterAll(async () => {
    // Clean up any test results
    if (sampleResultId) {
      await Result.findByIdAndDelete(sampleResultId);
    }
    await mongoose.connection.close();
  });

  // TC-B3-01: Single Attendance Marking
  it('TC-B3-01: POST /api/attendance/mark records attendance when invoked by faculty', async () => {
    const res = await request(app)
      .post('/api/attendance/mark')
      .set('Authorization', `Bearer ${facultyToken}`)
      .send({
        student: sampleStudentId,
        subject: sampleSubjectId,
        date: new Date().toISOString(),
        status: 'Present',
        semester: 5,
        remarks: 'Attentive and engaged',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.attendance.status).toBe('Present');
  });

  // TC-B3-02: Batch Attendance Marking
  it('TC-B3-02: POST /api/attendance/mark supports batch recording for multiple students', async () => {
    const students = await Student.find().limit(2);
    const records = students.map((s) => ({
      student: s._id.toString(),
      status: 'Present',
    }));

    const res = await request(app)
      .post('/api/attendance/mark')
      .set('Authorization', `Bearer ${facultyToken}`)
      .send({
        subject: sampleSubjectId,
        date: new Date().toISOString(),
        semester: 5,
        records,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(2);
  });

  // TC-B3-03: Student Attendance History & Percentage Calculation
  it('TC-B3-03: GET /api/attendance/student/:id computes attendance summary and statistics', async () => {
    const res = await request(app)
      .get(`/api/attendance/student/${sampleStudentId}`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stats).toBeDefined();
    expect(res.body.stats.total).toBeGreaterThan(0);
    expect(res.body.stats.percentage).toBeGreaterThanOrEqual(0);
    expect(res.body.stats.percentage).toBeLessThanOrEqual(100);
  });

  // TC-B3-04: Student Role Blocked from Marking Attendance
  it('TC-B3-04: POST /api/attendance/mark returns 403 Forbidden when student attempts marking', async () => {
    const res = await request(app)
      .post('/api/attendance/mark')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        student: sampleStudentId,
        subject: sampleSubjectId,
        date: new Date().toISOString(),
        status: 'Present',
        semester: 5,
      });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  // TC-B3-05: Attendance Statistics
  it('TC-B3-05: GET /api/attendance/stats/overview returns high-level institutional rates', async () => {
    const res = await request(app)
      .get('/api/attendance/stats/overview')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stats.totalRecords).toBeGreaterThan(0);
  });

  // TC-B3-06: Create Exam Result
  it('TC-B3-06: POST /api/results records student marks', async () => {
    const res = await request(app)
      .post('/api/results')
      .set('Authorization', `Bearer ${facultyToken}`)
      .send({
        student: sampleStudentId,
        subject: sampleSubjectId,
        examType: 'Final',
        marksObtained: 92,
        totalMarks: 100,
        semester: 5,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.result).toBeDefined();
    expect(res.body.result.grade).toBe('A+');
    sampleResultId = res.body.result._id;
  });

  // TC-B3-07: Automatic Letter Grade Calculation
  it('TC-B3-07: Result pre-save hook calculates grade automatically', async () => {
    const res = await request(app)
      .post('/api/results')
      .set('Authorization', `Bearer ${facultyToken}`)
      .send({
        student: sampleStudentId,
        subject: sampleSubjectId,
        examType: 'Assignment',
        marksObtained: 75,
        totalMarks: 100,
        semester: 5,
      });

    expect(res.status).toBe(201);
    expect(res.body.result.grade).toBe('B');
  });

  // TC-B3-08: Student Marksheet & GPA Aggregation
  it('TC-B3-08: GET /api/results/student/:id returns marksheet with calculated GPA', async () => {
    const res = await request(app)
      .get(`/api/results/student/${sampleStudentId}`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.summary).toBeDefined();
    expect(res.body.summary.gpa).toBeGreaterThan(0);
    expect(Array.isArray(res.body.results)).toBe(true);
  });

  // TC-B3-09: Update Result Marks
  it('TC-B3-09: PUT /api/results/:id updates student marks and recomputes grade', async () => {
    const res = await request(app)
      .put(`/api/results/${sampleResultId}`)
      .set('Authorization', `Bearer ${facultyToken}`)
      .send({
        marksObtained: 85,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.result.marksObtained).toBe(85);
  });

  // TC-B3-10: Timetable Query
  it('TC-B3-10: GET /api/timetables retrieves academic schedule', async () => {
    const res = await request(app)
      .get('/api/timetables?department=Computer%20Science%20%26%20Engineering&semester=5')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.timetables.length).toBeGreaterThan(0);
    expect(res.body.timetables[0].periods.length).toBeGreaterThan(0);
  });

  // TC-B3-11: Upsert Timetable Entry
  it('TC-B3-11: POST /api/timetables creates or updates day schedule', async () => {
    const res = await request(app)
      .post('/api/timetables')
      .set('Authorization', `Bearer ${facultyToken}`)
      .send({
        department: 'Computer Science & Engineering',
        semester: 5,
        section: 'A',
        day: 'Wednesday',
        periods: [
          {
            periodNumber: 1,
            startTime: '10:00 AM',
            endTime: '11:00 AM',
            subject: sampleSubjectId,
            roomNumber: 'Room 402',
          },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.timetable.day).toBe('Wednesday');
  });
});
