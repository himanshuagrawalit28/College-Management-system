import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student reference is required'],
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: [true, 'Subject reference is required'],
    },
    date: {
      type: Date,
      required: [true, 'Attendance date is required'],
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late'],
      default: 'Present',
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to avoid duplicate attendance entries for the same student, subject, and day
attendanceSchema.index({ student: 1, subject: 1, date: 1 }, { unique: false });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
