import Course from '../models/Course.js';
import Subject from '../models/Subject.js';

// --- Course Operations ---

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public / Private
export const getCourses = async (req, res, next) => {
  try {
    const { department, status } = req.query;
    const query = {};
    if (department && department !== 'All') query.department = department;
    if (status && status !== 'All') query.status = status;

    const courses = await Course.find(query).sort({ courseName: 1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course with its subjects
// @route   GET /api/courses/:id
// @access  Public / Private
export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const subjects = await Subject.find({ course: course._id }).populate('facultyAssigned', 'name email');

    res.status(200).json({
      success: true,
      course,
      subjects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Private (Admin)
export const createCourse = async (req, res, next) => {
  try {
    const { courseCode, courseName, department, durationYears, totalSemesters, description } = req.body;

    if (!courseCode || !courseName || !department) {
      return res.status(400).json({
        success: false,
        message: 'Course code, name, and department are required',
      });
    }

    const existingCourse = await Course.findOne({ courseCode: courseCode.toUpperCase() });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: `Course code ${courseCode} already exists`,
      });
    }

    const course = await Course.create({
      courseCode: courseCode.toUpperCase(),
      courseName,
      department,
      durationYears: durationYears || 4,
      totalSemesters: totalSemesters || 8,
      description: description || '',
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin)
export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin)
export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    await Course.findByIdAndDelete(req.params.id);
    // Remove associated subjects
    await Subject.deleteMany({ course: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Course and linked subjects removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// --- Subject Operations ---

// @desc    Get all subjects
// @route   GET /api/courses/subjects/all
// @access  Private
export const getSubjects = async (req, res, next) => {
  try {
    const { course, semester, department } = req.query;
    const query = {};
    if (course) query.course = course;
    if (semester) query.semester = Number(semester);
    if (department) query.department = department;

    const subjects = await Subject.find(query)
      .populate('course', 'courseCode courseName')
      .populate('facultyAssigned', 'name email department');

    res.status(200).json({
      success: true,
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create subject
// @route   POST /api/courses/subjects
// @access  Private (Admin)
export const createSubject = async (req, res, next) => {
  try {
    const { subjectCode, subjectName, course, semester, credits, department, facultyAssigned } = req.body;

    if (!subjectCode || !subjectName || !course || !semester || !department) {
      return res.status(400).json({
        success: false,
        message: 'Subject code, name, course, semester, and department are required',
      });
    }

    const existing = await Subject.findOne({ subjectCode: subjectCode.toUpperCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Subject with code ${subjectCode} already exists`,
      });
    }

    const subject = await Subject.create({
      subjectCode: subjectCode.toUpperCase(),
      subjectName,
      course,
      semester: Number(semester),
      credits: credits || 3,
      department,
      facultyAssigned: facultyAssigned || null,
    });

    const populatedSubject = await Subject.findById(subject._id)
      .populate('course', 'courseCode courseName')
      .populate('facultyAssigned', 'name email');

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      subject: populatedSubject,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update subject
// @route   PUT /api/courses/subjects/:id
// @access  Private (Admin)
export const updateSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ success: false, message: 'Subject not found' });
    }

    const updated = await Subject.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .populate('course', 'courseCode courseName')
      .populate('facultyAssigned', 'name email');

    res.status(200).json({
      success: true,
      message: 'Subject updated successfully',
      subject: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete subject
// @route   DELETE /api/courses/subjects/:id
// @access  Private (Admin)
export const deleteSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ success: false, message: 'Subject not found' });
    }

    await Subject.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Subject removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
