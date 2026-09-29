import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: [true, 'Please provide course code'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    courseName: {
      type: String,
      required: [true, 'Please provide course name'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Please specify department'],
      trim: true,
    },
    durationYears: {
      type: Number,
      default: 4,
    },
    totalSemesters: {
      type: Number,
      default: 8,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
