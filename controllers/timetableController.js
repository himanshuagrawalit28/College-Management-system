import Timetable from '../models/Timetable.js';

// @desc    Get timetables with filters
// @route   GET /api/timetables
// @access  Private
export const getTimetables = async (req, res, next) => {
  try {
    const { department, semester, day, section } = req.query;

    const query = {};
    if (department && department !== 'All') query.department = department;
    if (semester && semester !== 'All') query.semester = Number(semester);
    if (day && day !== 'All') query.day = day;
    if (section && section !== 'All') query.section = section;

    const timetables = await Timetable.find(query)
      .populate('periods.subject', 'subjectCode subjectName credits')
      .populate({
        path: 'periods.faculty',
        populate: { path: 'user', select: 'name email' },
      })
      .sort({ semester: 1, day: 1 });

    res.status(200).json({
      success: true,
      count: timetables.length,
      timetables,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update timetable schedule for a day
// @route   POST /api/timetables
// @access  Private (Admin, Faculty)
export const createOrUpdateTimetable = async (req, res, next) => {
  try {
    const { department, semester, section = 'A', day, periods } = req.body;

    if (!department || !semester || !day || !periods) {
      return res.status(400).json({
        success: false,
        message: 'Department, semester, day, and periods array are required',
      });
    }

    const timetable = await Timetable.findOneAndUpdate(
      { department, semester: Number(semester), section, day },
      {
        department,
        semester: Number(semester),
        section,
        day,
        periods,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
      .populate('periods.subject', 'subjectCode subjectName credits')
      .populate({
        path: 'periods.faculty',
        populate: { path: 'user', select: 'name email' },
      });

    res.status(200).json({
      success: true,
      message: 'Timetable updated successfully',
      timetable,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a timetable schedule
// @route   DELETE /api/timetables/:id
// @access  Private (Admin)
export const deleteTimetable = async (req, res, next) => {
  try {
    const timetable = await Timetable.findById(req.params.id);
    if (!timetable) {
      return res.status(404).json({ success: false, message: 'Timetable not found' });
    }

    await Timetable.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Timetable schedule removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
