import Result from '../models/Result.js';

// @desc    Create / Record exam result or marks
// @route   POST /api/results
// @access  Private (Admin, Faculty)
export const createResult = async (req, res, next) => {
  try {
    const { student, subject, examType, marksObtained, totalMarks = 100, semester, academicYear } = req.body;

    if (!student || !subject || marksObtained === undefined || !semester) {
      return res.status(400).json({
        success: false,
        message: 'Student, subject, semester, and marks are required',
      });
    }

    const result = await Result.create({
      student,
      subject,
      examType: examType || 'Final',
      marksObtained: Number(marksObtained),
      totalMarks: Number(totalMarks),
      semester: Number(semester),
      academicYear: academicYear || '2025-2026',
      enteredBy: req.user._id,
    });

    const populated = await Result.findById(result._id)
      .populate('student')
      .populate('subject', 'subjectCode subjectName credits');

    res.status(201).json({
      success: true,
      message: 'Result recorded successfully',
      result: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get results for a specific student with CGPA/GPA calculation
// @route   GET /api/results/student/:studentId
// @access  Private
export const getStudentResults = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { semester } = req.query;

    const query = { student: studentId };
    if (semester) query.semester = Number(semester);

    const results = await Result.find(query)
      .populate('subject', 'subjectCode subjectName credits')
      .sort({ semester: 1, createdAt: -1 });

    let totalMarksSum = 0;
    let marksObtainedSum = 0;
    let totalCredits = 0;
    let totalCreditPoints = 0;

    results.forEach((r) => {
      totalMarksSum += r.totalMarks;
      marksObtainedSum += r.marksObtained;
      const credits = (r.subject && r.subject.credits) || 3;
      totalCredits += credits;

      // Grade point mapping
      let gp = 0;
      if (r.grade === 'A+') gp = 10;
      else if (r.grade === 'A') gp = 9;
      else if (r.grade === 'B') gp = 8;
      else if (r.grade === 'C') gp = 7;
      else if (r.grade === 'D') gp = 6;
      else gp = 0;

      totalCreditPoints += gp * credits;
    });

    const gpa = totalCredits > 0 ? (totalCreditPoints / totalCredits).toFixed(2) : 0;
    const overallPercentage = totalMarksSum > 0 ? Math.round((marksObtainedSum / totalMarksSum) * 100) : 0;

    res.status(200).json({
      success: true,
      summary: {
        totalSubjects: results.length,
        gpa: Number(gpa),
        overallPercentage,
      },
      results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get results for a subject
// @route   GET /api/results/subject/:subjectId
// @access  Private (Admin, Faculty)
export const getSubjectResults = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const results = await Result.find({ subject: subjectId })
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' },
      })
      .sort({ marksObtained: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update result
// @route   PUT /api/results/:id
// @access  Private (Admin, Faculty)
export const updateResult = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }

    if (req.body.marksObtained !== undefined) {
      result.marksObtained = Number(req.body.marksObtained);
    }
    if (req.body.totalMarks !== undefined) {
      result.totalMarks = Number(req.body.totalMarks);
    }
    if (req.body.examType) {
      result.examType = req.body.examType;
    }

    await result.save();

    res.status(200).json({
      success: true,
      message: 'Result updated successfully',
      result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete result
// @route   DELETE /api/results/:id
// @access  Private (Admin)
export const deleteResult = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }

    await Result.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Result removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
