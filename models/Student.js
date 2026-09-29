import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentId: {
      type: String,
      required: [true, 'Please provide student ID'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    rollNo: {
      type: String,
      required: [true, 'Please provide roll number'],
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    courseName: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
      trim: true,
    },
    semester: {
      type: Number,
      default: 1,
      min: 1,
      max: 12,
    },
    academicYear: {
      type: String,
      default: '2025-2026',
    },
    phone: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    guardianName: {
      type: String,
      default: '',
    },
    guardianPhone: {
      type: String,
      default: '',
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Graduated'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;
