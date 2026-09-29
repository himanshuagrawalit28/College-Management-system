import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Subject from '../models/Subject.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import Attendance from '../models/Attendance.js';
import Result from '../models/Result.js';
import Timetable from '../models/Timetable.js';
import Fee from '../models/Fee.js';
import Notice from '../models/Notice.js';
import Event from '../models/Event.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college_management';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }

    console.log('[Seeder]: Cleaning existing database collections...');
    try {
      await mongoose.connection.db.dropCollection('users');
    } catch (e) {}
    try {
      await mongoose.connection.db.dropCollection('courses');
    } catch (e) {}
    try {
      await mongoose.connection.db.dropCollection('subjects');
    } catch (e) {}
    try {
      await mongoose.connection.db.dropCollection('students');
    } catch (e) {}
    try {
      await mongoose.connection.db.dropCollection('faculties');
    } catch (e) {}
    try {
      await mongoose.connection.db.dropCollection('attendances');
    } catch (e) {}
    try {
      await mongoose.connection.db.dropCollection('results');
    } catch (e) {}
    try {
      await mongoose.connection.db.dropCollection('timetables');
    } catch (e) {}
    try {
      await mongoose.connection.db.dropCollection('fees');
    } catch (e) {}
    try {
      await mongoose.connection.db.dropCollection('notices');
    } catch (e) {}
    try {
      await mongoose.connection.db.dropCollection('events');
    } catch (e) {}

    // 1. Seed Users
    console.log('[Seeder]: Creating User accounts...');
    const adminUser = await User.create({
      name: 'Dr. Robert Vance',
      email: 'admin@apexcollege.edu',
      password: 'password123',
      role: 'admin',
      department: 'Administration',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      phone: '+1 (555) 019-2834',
    });

    const facultyUser1 = await User.create({
      name: 'Prof. Sarah Jenkins',
      email: 'faculty@apexcollege.edu',
      password: 'password123',
      role: 'faculty',
      employeeId: 'FAC-2023-042',
      department: 'Computer Science & Engineering',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      phone: '+1 (555) 839-1123',
    });

    const facultyUser2 = await User.create({
      name: 'Dr. Alan Mitchell',
      email: 'alan.mitchell@apexcollege.edu',
      password: 'password123',
      role: 'faculty',
      employeeId: 'FAC-2022-019',
      department: 'Computer Science & Engineering',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      phone: '+1 (555) 748-3920',
    });

    const studentUser1 = await User.create({
      name: 'Alex Rivera',
      email: 'student@apexcollege.edu',
      password: 'password123',
      role: 'student',
      rollNumber: 'CS2023-018',
      department: 'Computer Science & Engineering',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      phone: '+1 (555) 438-9902',
    });

    const studentUser2 = await User.create({
      name: 'Emma Watson',
      email: 'emma.watson@apexcollege.edu',
      password: 'password123',
      role: 'student',
      rollNumber: 'CS2023-019',
      department: 'Computer Science & Engineering',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      phone: '+1 (555) 234-8890',
    });

    // 2. Seed Courses
    console.log('[Seeder]: Creating Academic Courses...');
    const cseCourse = await Course.create({
      courseCode: 'BTECH-CSE',
      courseName: 'Bachelor of Technology in Computer Science & Engineering',
      department: 'Computer Science & Engineering',
      durationYears: 4,
      totalSemesters: 8,
      description: 'Comprehensive program covering software engineering, algorithms, AI, and systems architecture.',
    });

    const eceCourse = await Course.create({
      courseCode: 'BTECH-ECE',
      courseName: 'Bachelor of Technology in Electronics & Communication',
      department: 'Electronics & Communication',
      durationYears: 4,
      totalSemesters: 8,
      description: 'Focuses on microelectronics, signal processing, and communication networks.',
    });

    const mbaCourse = await Course.create({
      courseCode: 'MBA-GEN',
      courseName: 'Master of Business Administration',
      department: 'Management Studies',
      durationYears: 2,
      totalSemesters: 4,
      description: 'Advanced business, finance, and management leadership curriculum.',
    });

    // 3. Seed Subjects
    console.log('[Seeder]: Creating Subjects...');
    const sub1 = await Subject.create({
      subjectCode: 'CS201',
      subjectName: 'Data Structures and Algorithms',
      course: cseCourse._id,
      semester: 3,
      credits: 4,
      department: 'Computer Science & Engineering',
      facultyAssigned: facultyUser1._id,
    });

    const sub2 = await Subject.create({
      subjectCode: 'CS301',
      subjectName: 'Database Management Systems',
      course: cseCourse._id,
      semester: 4,
      credits: 4,
      department: 'Computer Science & Engineering',
      facultyAssigned: facultyUser1._id,
    });

    const sub3 = await Subject.create({
      subjectCode: 'CS302',
      subjectName: 'Operating Systems',
      course: cseCourse._id,
      semester: 5,
      credits: 4,
      department: 'Computer Science & Engineering',
      facultyAssigned: facultyUser2._id,
    });

    const sub4 = await Subject.create({
      subjectCode: 'CS401',
      subjectName: 'Computer Networks',
      course: cseCourse._id,
      semester: 5,
      credits: 3,
      department: 'Computer Science & Engineering',
      facultyAssigned: facultyUser2._id,
    });

    // 4. Seed Faculty Profiles
    console.log('[Seeder]: Creating Faculty Profiles...');
    await Faculty.create({
      user: facultyUser1._id,
      facultyId: 'FAC-2023-042',
      department: 'Computer Science & Engineering',
      designation: 'Associate Professor',
      qualification: 'Ph.D. in Computer Science (Stanford)',
      phone: facultyUser1.phone,
      address: '742 Evergreen Terrace, Tech Park Area',
      subjectsAssigned: [sub1._id, sub2._id],
      status: 'Active',
    });

    await Faculty.create({
      user: facultyUser2._id,
      facultyId: 'FAC-2022-019',
      department: 'Computer Science & Engineering',
      designation: 'Assistant Professor',
      qualification: 'M.Tech in Distributed Systems (MIT)',
      phone: facultyUser2.phone,
      address: '108 Campus Drive, Academic Block',
      subjectsAssigned: [sub3._id, sub4._id],
      status: 'Active',
    });

    // 5. Seed Student Profiles
    console.log('[Seeder]: Creating Student Profiles...');
    const student1 = await Student.create({
      user: studentUser1._id,
      studentId: 'STU-2023-018',
      rollNo: 'CS2023-018',
      course: cseCourse._id,
      courseName: 'B.Tech CSE',
      department: 'Computer Science & Engineering',
      semester: 5,
      academicYear: '2025-2026',
      phone: studentUser1.phone,
      address: '123 Baker Street, College Avenue',
      guardianName: 'Carlos Rivera',
      guardianPhone: '+1 (555) 438-9900',
      status: 'Active',
    });

    const student2 = await Student.create({
      user: studentUser2._id,
      studentId: 'STU-2023-019',
      rollNo: 'CS2023-019',
      course: cseCourse._id,
      courseName: 'B.Tech CSE',
      department: 'Computer Science & Engineering',
      semester: 5,
      academicYear: '2025-2026',
      phone: studentUser2.phone,
      address: '456 Oxford Road, Metro Heights',
      guardianName: 'George Watson',
      guardianPhone: '+1 (555) 234-8800',
      status: 'Active',
    });

    // 6. Seed Attendance Records
    console.log('[Seeder]: Creating Attendance Records...');
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);

      await Attendance.create({
        student: student1._id,
        subject: sub1._id,
        date: pastDate,
        status: i === 3 ? 'Absent' : i === 5 ? 'Late' : 'Present',
        semester: 5,
        markedBy: facultyUser1._id,
      });

      await Attendance.create({
        student: student2._id,
        subject: sub1._id,
        date: pastDate,
        status: 'Present',
        semester: 5,
        markedBy: facultyUser1._id,
      });
    }

    // 7. Seed Results (Exam Grades)
    console.log('[Seeder]: Creating Exam Results...');
    await Result.create({
      student: student1._id,
      subject: sub1._id,
      examType: 'Midterm',
      marksObtained: 88,
      totalMarks: 100,
      semester: 5,
      academicYear: '2025-2026',
      enteredBy: facultyUser1._id,
    });

    await Result.create({
      student: student1._id,
      subject: sub2._id,
      examType: 'Midterm',
      marksObtained: 94,
      totalMarks: 100,
      semester: 5,
      academicYear: '2025-2026',
      enteredBy: facultyUser1._id,
    });

    await Result.create({
      student: student1._id,
      subject: sub3._id,
      examType: 'Midterm',
      marksObtained: 82,
      totalMarks: 100,
      semester: 5,
      academicYear: '2025-2026',
      enteredBy: facultyUser2._id,
    });

    // 8. Seed Timetable
    console.log('[Seeder]: Creating Timetable Schedules...');
    await Timetable.create({
      department: 'Computer Science & Engineering',
      semester: 5,
      section: 'A',
      day: 'Monday',
      periods: [
        {
          periodNumber: 1,
          startTime: '09:00 AM',
          endTime: '10:00 AM',
          subject: sub1._id,
          roomNumber: 'Lab 2',
        },
        {
          periodNumber: 2,
          startTime: '10:15 AM',
          endTime: '11:15 AM',
          subject: sub2._id,
          roomNumber: 'Room 304',
        },
        {
          periodNumber: 3,
          startTime: '11:30 AM',
          endTime: '12:30 PM',
          subject: sub3._id,
          roomNumber: 'Room 305',
        },
      ],
    });

    await Timetable.create({
      department: 'Computer Science & Engineering',
      semester: 5,
      section: 'A',
      day: 'Tuesday',
      periods: [
        {
          periodNumber: 1,
          startTime: '09:00 AM',
          endTime: '10:00 AM',
          subject: sub3._id,
          roomNumber: 'Room 305',
        },
        {
          periodNumber: 2,
          startTime: '10:15 AM',
          endTime: '11:15 AM',
          subject: sub4._id,
          roomNumber: 'Room 302',
        },
      ],
    });

    // 9. Seed Fee Invoices
    console.log('[Seeder]: Creating Fee Invoices...');
    await Fee.create({
      student: student1._id,
      feeType: 'Tuition Fee',
      amount: 4500,
      dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      paidDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      status: 'Paid',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-982341-APX',
      receiptNumber: 'REC-00192',
      semester: 5,
    });

    await Fee.create({
      student: student1._id,
      feeType: 'Examination Fee',
      amount: 350,
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      status: 'Pending',
      semester: 5,
    });

    await Fee.create({
      student: student2._id,
      feeType: 'Tuition Fee',
      amount: 4500,
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      status: 'Pending',
      semester: 5,
    });

    // 10. Seed Notices
    console.log('[Seeder]: Creating Notices...');
    await Notice.create({
      title: 'Mid-Term Examination Schedule - Fall 2026',
      content: 'The mid-term examination timetable for Computer Science and Engineering is now officially released. Students are advised to review dates and reporting venues.',
      category: 'Examination',
      targetAudience: 'Students',
      priority: 'High',
      author: adminUser._id,
    });

    await Notice.create({
      title: 'Campus Recruitment Drive 2026: Tier 1 Tech Firms',
      content: 'Leading software product firms will be conducting pre-placement talks and coding rounds on campus beginning next month. Eligible students should register via the placement portal.',
      category: 'General',
      targetAudience: 'All',
      priority: 'Normal',
      author: facultyUser1._id,
    });

    await Notice.create({
      title: 'Faculty Academic Council Meeting',
      content: 'All department heads and senior professors are requested to attend the curriculum revision conference in the Dean Boardroom.',
      category: 'Academic',
      targetAudience: 'Faculty',
      priority: 'Normal',
      author: adminUser._id,
    });

    // 11. Seed Events
    console.log('[Seeder]: Creating Events...');
    await Event.create({
      title: 'Apex TechFest 2026 - Innovation & Robotics Expo',
      description: 'Annual flagship engineering festival featuring autonomous bot races, competitive coding, hackathons, and hardware showcases.',
      eventDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      venue: 'Main Campus Quadrangle & Labs',
      organizer: 'Engineering Student Council',
      category: 'Academic',
    });

    await Event.create({
      title: 'Inter-College Sports Championship',
      description: 'Annual athletic tournament spanning soccer, basketball, track & field, and badminton with collegiate teams across the state.',
      eventDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      startTime: '08:00 AM',
      endTime: '05:00 PM',
      venue: 'University Sports Complex',
      organizer: 'Department of Physical Education',
      category: 'Sports',
    });

    console.log('[Seeder]: All Phase 1, 2, 3, and 4 collections seeded successfully in MongoDB.');
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`);
    throw error;
  }
};

// If run directly from CLI
if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  seedDatabase()
    .then(() => {
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}

export default seedDatabase;
