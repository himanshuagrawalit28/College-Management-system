import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../server.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Fee from '../models/Fee.js';
import Notice from '../models/Notice.js';
import Event from '../models/Event.js';

dotenv.config();

describe('Backend Phase 4 Test Suite - Finance, Notices & Campus Events', () => {
  let adminToken = '';
  let facultyToken = '';
  let studentToken = '';
  let sampleStudentId = '';
  let sampleFeeId = '';
  let sampleNoticeId = '';
  let sampleEventId = '';

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

    // Cache sample student
    const student = await Student.findOne({ studentId: 'STU-2023-018' });
    if (student) sampleStudentId = student._id.toString();

    // Cache sample pending fee
    const fee = await Fee.findOne({ status: 'Pending' });
    if (fee) sampleFeeId = fee._id.toString();
  });

  afterAll(async () => {
    if (sampleNoticeId) {
      await Notice.findByIdAndDelete(sampleNoticeId);
    }
    if (sampleEventId) {
      await Event.findByIdAndDelete(sampleEventId);
    }
    await mongoose.connection.close();
  });

  // TC-B4-01: Fee List for Admin
  it('TC-B4-01: GET /api/fees returns all college invoices for admin', async () => {
    const res = await request(app)
      .get('/api/fees')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.fees)).toBe(true);
    expect(res.body.fees.length).toBeGreaterThan(0);
  });

  // TC-B4-02: Student Data Isolation on Fees
  it('TC-B4-02: GET /api/fees restricts student view to their own invoices only', async () => {
    const res = await request(app)
      .get('/api/fees')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    // All invoices returned must belong to this student
    res.body.fees.forEach((f) => {
      expect(f.student._id.toString()).toBe(sampleStudentId);
    });
  });

  // TC-B4-03: Admin Creates Fee Invoice
  it('TC-B4-03: POST /api/fees generates new fee invoice', async () => {
    const res = await request(app)
      .post('/api/fees')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        student: sampleStudentId,
        feeType: 'Library Fee',
        amount: 150,
        dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        semester: 5,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.fee.amount).toBe(150);
    expect(res.body.fee.status).toBe('Pending');
  });

  // TC-B4-04: Process Fee Payment
  it('TC-B4-04: POST /api/fees/:id/pay successfully processes payment and issues receipt', async () => {
    const res = await request(app)
      .post(`/api/fees/${sampleFeeId}/pay`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        paymentMethod: 'UPI',
        transactionId: `TXN-${Date.now()}`,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.fee.status).toBe('Paid');
    expect(res.body.receiptNumber).toBeDefined();
    expect(res.body.fee.paymentMethod).toBe('UPI');
  });

  // TC-B4-05: Double Payment Prevention
  it('TC-B4-05: POST /api/fees/:id/pay blocks duplicate payment on already paid fee', async () => {
    const res = await request(app)
      .post(`/api/fees/${sampleFeeId}/pay`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ paymentMethod: 'Credit Card' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/already been paid/i);
  });

  // TC-B4-06: Financial Statistics
  it('TC-B4-06: GET /api/fees/stats/overview returns revenue statistics for admin', async () => {
    const res = await request(app)
      .get('/api/fees/stats/overview')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stats.totalRevenue).toBeGreaterThan(0);
  });

  // TC-B4-07: Notice Board Retrieval
  it('TC-B4-07: GET /api/notices returns published campus notices', async () => {
    const res = await request(app)
      .get('/api/notices')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.notices.length).toBeGreaterThan(0);
    expect(res.body.notices[0].author).toBeDefined();
  });

  // TC-B4-08: Admin/Faculty Publishes Notice
  it('TC-B4-08: POST /api/notices creates new campus bulletin notice', async () => {
    const res = await request(app)
      .post('/api/notices')
      .set('Authorization', `Bearer ${facultyToken}`)
      .send({
        title: 'Library Hours Extended for Exams',
        content: 'The central library will remain open 24/7 during final exam week.',
        category: 'Academic',
        targetAudience: 'All',
        priority: 'Normal',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.notice.title).toBe('Library Hours Extended for Exams');
    sampleNoticeId = res.body.notice._id;
  });

  // TC-B4-09: Student Blocked from Publishing Notice
  it('TC-B4-09: POST /api/notices returns 403 Forbidden when invoked by student', async () => {
    const res = await request(app)
      .post('/api/notices')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        title: 'Unofficial Notice',
        content: 'This should not succeed.',
      });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  // TC-B4-10: Campus Events Listing
  it('TC-B4-10: GET /api/events returns campus calendar of activities', async () => {
    const res = await request(app)
      .get('/api/events')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.events.length).toBeGreaterThan(0);
  });

  // TC-B4-11: Admin/Faculty Creates Event
  it('TC-B4-11: POST /api/events creates campus workshop event', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Cybersecurity & Ethical Hacking Bootcamp',
        description: 'Hands-on practical labs on network security and penetration testing.',
        eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        venue: 'CS Seminar Hall 1',
        category: 'Workshop',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.event.title).toBe('Cybersecurity & Ethical Hacking Bootcamp');
    sampleEventId = res.body.event._id;
  });
});
