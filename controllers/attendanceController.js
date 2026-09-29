import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

// @desc    Mark attendance for single or multiple students
// @route   POST /api/attendance/mark
// @access  Private (Admin, Faculty)
export const markAttendance = async (req, res, next) => {
  try {
    const { records, subject, date, semester } = req.body;
    // records: Array of { studentId: ObjectId, status: 'Present' | 'Absent' | 'Late', remarks?: string }
    // OR single record: { student: ObjectId, subject: ObjectId, date, status, semester }

    if (Array.isArray(records)) {
      if (!subject || !date || !semester) {
        return res.status(400).json({
          success: false,
          message: 'Subject, date, and semester are required for batch marking',
        });
      }

      const attendanceEntries = [];
      for (const rec of records) {
        // Upsert or create
        const entry = await Attendance.findOneAndUpdate(
          {
            student: rec.student,
            subject,
            date: new Date(date),
          },
          {
            student: rec.student,
            subject,
            date: new Date(date),
            status: rec.status || 'Present',
            semester: Number(semester),
            markedBy: req.user._id,
            remarks: rec.remarks || '',
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        attendanceEntries.push(entry);
      }

      return res.status(200).json({
        success: true,
        message: `Attendance recorded for ${attendanceEntries.length} students`,
        count: attendanceEntries.length,
        records: attendanceEntries,
      });
    }

    // Single record mark
    const { student, status = 'Present', remarks } = req.body;
    if (!student || !subject || !date || !semester) {
      return res.status(400).json({
        success: false,
        message: 'Student, subject, date, and semester are required',
      });
    }

    const attendance = await Attendance.create({
      student,
      subject,
      date: new Date(date),
      status,
      semester: Number(semester),
      markedBy: req.user._id,
      remarks: remarks || '',
    });

    res.status(201).json({
      success: true,
      message: 'Attendance recorded successfully',
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance history & stats for a student
// @route   GET /api/attendance/student/:studentId
// @access  Private
export const getStudentAttendance = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const records = await Attendance.find({ student: studentId })
      .populate('subject', 'subjectCode subjectName credits')
      .populate('markedBy', 'name email')
      .sort({ date: -1 });

    const total = records.length;
    const present = records.filter((r) => r.status === 'Present').length;
    const absent = records.filter((r) => r.status === 'Absent').length;
    const late = records.filter((r) => r.status === 'Late').length;
    const percentage = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 100;

    res.status(200).json({
      success: true,
      stats: {
        total,
        present,
        absent,
        late,
        percentage,
      },
      records,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance records for a specific subject
// @route   GET /api/attendance/subject/:subjectId
// @access  Private (Admin, Faculty)
export const getSubjectAttendance = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const { date } = req.query;

    const query = { subject: subjectId };
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      query.date = { $gte: searchDate, $lt: nextDay };
    }

    const records = await Attendance.find(query)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' },
      })
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      records,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get overall attendance stats
// @route   GET /api/attendance/stats/overview
// @access  Private
export const getAttendanceStats = async (req, res, next) => {
  try {
    const total = await Attendance.countDocuments();
    const present = await Attendance.countDocuments({ status: 'Present' });
    const absent = await Attendance.countDocuments({ status: 'Absent' });
    const late = await Attendance.countDocuments({ status: 'Late' });

    const averageRate = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 92;

    res.status(200).json({
      success: true,
      stats: {
        totalRecords: total,
        present,
        absent,
        late,
        averageRate,
      },
    });
  } catch (error) {
    next(error);
  }
};
