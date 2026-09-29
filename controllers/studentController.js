import Student from '../models/Student.js';
import User from '../models/User.js';

// @desc    Get all students with filters & pagination
// @route   GET /api/students
// @access  Private (Admin, Faculty)
export const getStudents = async (req, res, next) => {
  try {
    const { keyword, department, semester, status, page = 1, limit = 50 } = req.query;

    const query = {};

    if (department && department !== 'All') {
      query.department = department;
    }

    if (semester && semester !== 'All') {
      query.semester = Number(semester);
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    let students = await Student.find(query)
      .populate('user', 'name email avatar role status')
      .populate('course', 'courseCode courseName department')
      .sort({ createdAt: -1 });

    // Client-side / keyword filtering across populated user name or rollNo / studentId
    if (keyword) {
      const regex = new RegExp(keyword, 'i');
      students = students.filter(
        (s) =>
          regex.test(s.studentId) ||
          regex.test(s.rollNo) ||
          (s.user && (regex.test(s.user.name) || regex.test(s.user.email)))
      );
    }

    // Pagination
    const totalCount = students.length;
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedStudents = students.slice(startIndex, startIndex + Number(limit));

    res.status(200).json({
      success: true,
      count: paginatedStudents.length,
      total: totalCount,
      page: Number(page),
      pages: Math.ceil(totalCount / Number(limit)) || 1,
      students: paginatedStudents,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Private
export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user', 'name email avatar role')
      .populate('course', 'courseCode courseName department');

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new student (with associated user)
// @route   POST /api/students
// @access  Private (Admin)
export const createStudent = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password = 'password123',
      studentId,
      rollNo,
      course,
      courseName,
      department,
      semester = 1,
      academicYear = '2025-2026',
      phone,
      address,
      guardianName,
      guardianPhone,
    } = req.body;

    if (!name || !email || !studentId || !rollNo || !department) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, student ID, roll number, and department are required',
      });
    }

    // Check if studentId already exists
    const existingStudent = await Student.findOne({ studentId: studentId.toUpperCase() });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: `Student with ID ${studentId} already exists`,
      });
    }

    // Find or create associated User
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password,
        role: 'student',
        department,
      });
    }

    const student = await Student.create({
      user: user._id,
      studentId: studentId.toUpperCase(),
      rollNo,
      course: course || null,
      courseName: courseName || '',
      department,
      semester: Number(semester),
      academicYear,
      phone: phone || '',
      address: address || '',
      guardianName: guardianName || '',
      guardianPhone: guardianPhone || '',
      status: 'Active',
    });

    const populatedStudent = await Student.findById(student._id)
      .populate('user', 'name email avatar role')
      .populate('course', 'courseCode courseName department');

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      student: populatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student profile
// @route   PUT /api/students/:id
// @access  Private (Admin, Faculty)
export const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    // If name or email updated, sync to User
    if (req.body.name || req.body.email) {
      const user = await User.findById(student.user);
      if (user) {
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        await user.save();
      }
    }

    // Update student fields
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate('user', 'name email avatar role')
      .populate('course', 'courseCode courseName department');

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      student: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete student profile
// @route   DELETE /api/students/:id
// @access  Private (Admin)
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Student profile removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student aggregate statistics
// @route   GET /api/students/stats/overview
// @access  Private
export const getStudentStats = async (req, res, next) => {
  try {
    const total = await Student.countDocuments();
    const active = await Student.countDocuments({ status: 'Active' });
    const inactive = await Student.countDocuments({ status: 'Inactive' });

    res.status(200).json({
      success: true,
      total,
      active,
      inactive,
    });
  } catch (error) {
    next(error);
  }
};
