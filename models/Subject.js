import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    subjectCode: {
      type: String,
      required: [true, 'Please provide subject code'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    subjectName: {
      type: String,
      required: [true, 'Please provide subject name'],
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Please specify associated course'],
    },
    semester: {
      type: Number,
      required: [true, 'Please specify semester number'],
      min: 1,
      max: 12,
    },
    credits: {
      type: Number,
      default: 3,
      min: 1,
      max: 10,
    },
    department: {
      type: String,
      required: [true, 'Please specify department'],
      trim: true,
    },
    facultyAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
