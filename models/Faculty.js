import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    facultyId: {
      type: String,
      required: [true, 'Please provide faculty ID'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
      trim: true,
    },
    designation: {
      type: String,
      default: 'Assistant Professor',
      trim: true,
    },
    qualification: {
      type: String,
      default: 'Ph.D. in Computer Science',
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    subjectsAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Resigned'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty;
