import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student is required'],
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: [true, 'Subject is required'],
    },
    examType: {
      type: String,
      enum: ['Midterm', 'Final', 'Assignment', 'Quiz'],
      default: 'Final',
    },
    marksObtained: {
      type: Number,
      required: [true, 'Marks obtained is required'],
      min: 0,
    },
    totalMarks: {
      type: Number,
      default: 100,
      min: 1,
    },
    grade: {
      type: String,
      default: 'A',
    },
    semester: {
      type: Number,
      required: true,
    },
    academicYear: {
      type: String,
      default: '2025-2026',
    },
    enteredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Helper method to compute letter grade
resultSchema.pre('save', function (next) {
  if (this.totalMarks > 0) {
    const pct = (this.marksObtained / this.totalMarks) * 100;
    if (pct >= 90) this.grade = 'A+';
    else if (pct >= 80) this.grade = 'A';
    else if (pct >= 70) this.grade = 'B';
    else if (pct >= 60) this.grade = 'C';
    else if (pct >= 50) this.grade = 'D';
    else this.grade = 'F';
  }
  next();
});

const Result = mongoose.model('Result', resultSchema);
export default Result;
