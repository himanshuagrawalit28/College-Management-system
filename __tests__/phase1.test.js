import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../server.js';
import User from '../models/User.js';

dotenv.config();

describe('Backend Phase 1 Test Suite - Database & Auth Engine', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college_management';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
  });

  afterAll(async () => {
    // Clean up test user
    await User.deleteMany({ email: /test.*@example\.com/ });
    await mongoose.connection.close();
  });

  // TC-B1-01: Health check
  it('TC-B1-01: GET /api/health returns 200 OK and healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe('healthy');
  });

  // TC-B1-02: Local MongoDB Connection Check
  it('TC-B1-02: Mongoose maintains an active connected state with local MongoDB', () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });

  // TC-B1-03: User Registration
  it('TC-B1-03: POST /api/auth/register registers new user and returns JWT token', async () => {
    const uniqueEmail = `test.student.${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'New Test Student',
        email: uniqueEmail,
        password: 'password123',
        role: 'student',
        department: 'Computer Science',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(uniqueEmail);
    expect(res.body.user.role).toBe('student');
  });

  // TC-B1-04: Duplicate Registration Prevention
  it('TC-B1-04: POST /api/auth/register rejects duplicate email address with 400', async () => {
    const duplicateEmail = 'admin@apexcollege.edu';
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Duplicate Admin',
        email: duplicateEmail,
        password: 'password123',
        role: 'admin',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/already exists/i);
  });

  // TC-B1-05: Login with Valid Credentials
  it('TC-B1-05: POST /api/auth/login authenticates seeded admin and issues token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@apexcollege.edu',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.role).toBe('admin');
    expect(res.body.user.name).toBe('Dr. Robert Vance');
  });

  // TC-B1-06: Login with Invalid Password
  it('TC-B1-06: POST /api/auth/login returns 401 when supplied wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@apexcollege.edu',
        password: 'wrong_password_xyz',
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/invalid email or password/i);
  });

  // TC-B1-07: Protected Route Access with Token
  it('TC-B1-07: GET /api/auth/me returns authenticated user profile when token is valid', async () => {
    // Obtain token first
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'faculty@apexcollege.edu',
        password: 'password123',
      });
    const token = loginRes.body.token;

    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.success).toBe(true);
    expect(meRes.body.user.email).toBe('faculty@apexcollege.edu');
    expect(meRes.body.user.role).toBe('faculty');
  });

  // TC-B1-08: Protected Route Blocks Unauthenticated Requests
  it('TC-B1-08: GET /api/auth/me rejects request without Bearer token with 401', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  // TC-B1-09: Password Hashing Verification
  it('TC-B1-09: User model stores passwords as bcrypt hashes, not plain text', async () => {
    const user = await User.findOne({ email: 'student@apexcollege.edu' }).select('+password');
    expect(user.password).not.toBe('password123');
    expect(user.password).toMatch(/^\$2[aby]\$\d+\$/); // Standard bcrypt hash prefix
  });

  // TC-B1-10: Forgot Password Endpoint
  it('TC-B1-10: POST /api/auth/forgot-password acknowledges password recovery request', async () => {
    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: 'student@apexcollege.edu' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBeDefined();
  });
});
