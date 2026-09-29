import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide notice title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide notice content'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['General', 'Academic', 'Examination', 'Event', 'Urgent'],
      default: 'General',
    },
    targetAudience: {
      type: String,
      enum: ['All', 'Students', 'Faculty'],
      default: 'All',
    },
    priority: {
      type: String,
      enum: ['Normal', 'High', 'Urgent'],
      default: 'Normal',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;
