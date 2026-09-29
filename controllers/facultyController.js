import Faculty from '../models/Faculty.js';
import User from '../models/User.js';

// @desc    Get all faculty members with filtering & pagination
// @route   GET /api/faculty
// @access  Private
export const getFaculty = async (req, res, next) => {
  try {
    const { keyword, department, status, page = 1, limit = 50 } = req.query;

    const query = {};
    if (department && department !== 'All') {
      query.department = department;
    }
    if (status && status !== 'All') {
      query.status = status;
    }

    let facultyList = await Faculty.find(query)
      .populate('user', 'name email avatar role status')
      .populate('subjectsAssigned', 'subjectCode subjectName semester')
      .sort({ createdAt: -1 });

    if (keyword) {
      const regex = new RegExp(keyword, 'i');
      facultyList = facultyList.filter(
        (f) =>
          regex.test(f.facultyId) ||
          regex.test(f.designation) ||
          (f.user && (regex.test(f.user.name) || regex.test(f.user.email)))
      );
    }

    const totalCount = facultyList.length;
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedFaculty = facultyList.slice(startIndex, startIndex + Number(limit));

    res.status(200).json({
      success: true,
      count: paginatedFaculty.length,
      total: totalCount,
      page: Number(page),
      pages: Math.ceil(totalCount / Number(limit)) || 1,
      faculty: paginatedFaculty,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single faculty member by ID
// @route   GET /api/faculty/:id
// @access  Private
export const getFacultyById = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .populate('user', 'name email avatar role')
      .populate('subjectsAssigned', 'subjectCode subjectName semester');

    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty profile not found' });
    }

    res.status(200).json({
      success: true,
      faculty,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new faculty profile
// @route   POST /api/faculty
// @access  Private (Admin)
export const createFaculty = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password = 'password123',
      facultyId,
      department,
      designation = 'Assistant Professor',
      qualification = 'Ph.D.',
      phone,
      address,
      subjectsAssigned = [],
    } = req.body;

    if (!name || !email || !facultyId || !department) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, faculty ID, and department are required',
      });
    }

    const existingFaculty = await Faculty.findOne({ facultyId: facultyId.toUpperCase() });
    if (existingFaculty) {
      return res.status(400).json({
        success: false,
        message: `Faculty member with ID ${facultyId} already exists`,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password,
        role: 'faculty',
        department,
      });
    }

    const faculty = await Faculty.create({
      user: user._id,
      facultyId: facultyId.toUpperCase(),
      department,
      designation,
      qualification,
      phone: phone || '',
      address: address || '',
      subjectsAssigned,
      status: 'Active',
    });

    const populatedFaculty = await Faculty.findById(faculty._id)
      .populate('user', 'name email avatar role')
      .populate('subjectsAssigned', 'subjectCode subjectName');

    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      faculty: populatedFaculty,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update faculty profile
// @route   PUT /api/faculty/:id
// @access  Private (Admin)
export const updateFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty profile not found' });
    }

    if (req.body.name || req.body.email) {
      const user = await User.findById(faculty.user);
      if (user) {
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        await user.save();
      }
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate('user', 'name email avatar role')
      .populate('subjectsAssigned', 'subjectCode subjectName');

    res.status(200).json({
      success: true,
      message: 'Faculty profile updated successfully',
      faculty: updatedFaculty,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete faculty profile
// @route   DELETE /api/faculty/:id
// @access  Private (Admin)
export const deleteFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty profile not found' });
    }

    await Faculty.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Faculty profile removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
