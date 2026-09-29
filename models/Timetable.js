import mongoose from 'mongoose';

const periodSchema = new mongoose.Schema({
  periodNumber: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    default: null,
  },
  roomNumber: {
    type: String,
    default: 'Room 301',
  },
});

const timetableSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: [true, 'Please provide department'],
      trim: true,
    },
    semester: {
      type: Number,
      required: [true, 'Please provide semester'],
    },
    section: {
      type: String,
      default: 'A',
      trim: true,
    },
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      required: [true, 'Please specify day of the week'],
    },
    periods: [periodSchema],
  },
  {
    timestamps: true,
  }
);

timetableSchema.index({ department: 1, semester: 1, section: 1, day: 1 }, { unique: true });

const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable;
