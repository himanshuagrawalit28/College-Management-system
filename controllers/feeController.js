import Fee from '../models/Fee.js';
import Student from '../models/Student.js';

// @desc    Get fee invoices (Admin sees all; Student sees own)
// @route   GET /api/fees
// @access  Private
export const getFees = async (req, res, next) => {
  try {
    const { student, status, feeType } = req.query;
    const query = {};

    // If caller is student, enforce querying only their student record
    if (req.user.role === 'student') {
      const studentProfile = await Student.findOne({ user: req.user._id });
      if (!studentProfile) {
        return res.status(200).json({ success: true, count: 0, fees: [] });
      }
      query.student = studentProfile._id;
    } else if (student) {
      query.student = student;
    }

    if (status && status !== 'All') query.status = status;
    if (feeType && feeType !== 'All') query.feeType = feeType;

    const fees = await Fee.find(query)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' },
      })
      .sort({ dueDate: -1 });

    res.status(200).json({
      success: true,
      count: fees.length,
      fees,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get fee invoice by ID
// @route   GET /api/fees/:id
// @access  Private
export const getFeeById = async (req, res, next) => {
  try {
    const fee = await Fee.findById(req.params.id).populate({
      path: 'student',
      populate: { path: 'user', select: 'name email' },
    });

    if (!fee) {
      return res.status(404).json({ success: false, message: 'Fee invoice not found' });
    }

    res.status(200).json({
      success: true,
      fee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create fee invoice
// @route   POST /api/fees
// @access  Private (Admin)
export const createFee = async (req, res, next) => {
  try {
    const { student, feeType, amount, dueDate, semester, academicYear } = req.body;

    if (!student || !amount || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Student, amount, and due date are required',
      });
    }

    const fee = await Fee.create({
      student,
      feeType: feeType || 'Tuition Fee',
      amount: Number(amount),
      dueDate: new Date(dueDate),
      semester: semester ? Number(semester) : 1,
      academicYear: academicYear || '2025-2026',
      status: 'Pending',
    });

    const populated = await Fee.findById(fee._id).populate({
      path: 'student',
      populate: { path: 'user', select: 'name email' },
    });

    res.status(201).json({
      success: true,
      message: 'Fee invoice created successfully',
      fee: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Pay fee invoice
// @route   POST /api/fees/:id/pay
// @access  Private
export const payFee = async (req, res, next) => {
  try {
    const { paymentMethod = 'Credit Card', transactionId } = req.body;
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({ success: false, message: 'Fee invoice not found' });
    }

    if (fee.status === 'Paid') {
      return res.status(400).json({ success: false, message: 'This fee invoice has already been paid' });
    }

    fee.status = 'Paid';
    fee.paidDate = new Date();
    fee.paymentMethod = paymentMethod;
    fee.transactionId = transactionId || `TXN-${Date.now()}`;
    fee.receiptNumber = `REC-${Date.now().toString().slice(-6)}`;

    await fee.save();

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      receiptNumber: fee.receiptNumber,
      transactionId: fee.transactionId,
      fee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get financial overview statistics
// @route   GET /api/fees/stats/overview
// @access  Private (Admin)
export const getFeeStats = async (req, res, next) => {
  try {
    const allFees = await Fee.find();
    let totalRevenue = 0;
    let totalPending = 0;
    let totalOverdue = 0;

    allFees.forEach((f) => {
      if (f.status === 'Paid') {
        totalRevenue += f.amount;
      } else if (f.status === 'Overdue') {
        totalOverdue += f.amount;
      } else {
        totalPending += f.amount;
      }
    });

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        totalPending,
        totalOverdue,
        totalInvoices: allFees.length,
      },
    });
  } catch (error) {
    next(error);
  }
};
