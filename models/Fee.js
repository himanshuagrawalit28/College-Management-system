import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student is required'],
    },
    feeType: {
      type: String,
      enum: ['Tuition Fee', 'Examination Fee', 'Hostel Fee', 'Library Fee', 'Other'],
      default: 'Tuition Fee',
    },
    amount: {
      type: Number,
      required: [true, 'Fee amount is required'],
      min: 0,
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    paidDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['Paid', 'Pending', 'Overdue'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'Bank Transfer', 'UPI', 'Cash', 'None'],
      default: 'None',
    },
    transactionId: {
      type: String,
      default: '',
    },
    receiptNumber: {
      type: String,
      default: '',
    },
    semester: {
      type: Number,
      default: 1,
    },
    academicYear: {
      type: String,
      default: '2025-2026',
    },
  },
  {
    timestamps: true,
  }
);

const Fee = mongoose.model('Fee', feeSchema);
export default Fee;
