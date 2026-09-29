import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    eventDate: {
      type: Date,
      required: [true, 'Please provide event date'],
    },
    startTime: {
      type: String,
      default: '10:00 AM',
    },
    endTime: {
      type: String,
      default: '04:00 PM',
    },
    venue: {
      type: String,
      default: 'Main Auditorium',
      trim: true,
    },
    organizer: {
      type: String,
      default: 'Student Council',
      trim: true,
    },
    category: {
      type: String,
      enum: ['Academic', 'Cultural', 'Sports', 'Workshop', 'Seminar'],
      default: 'Academic',
    },
    bannerImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
