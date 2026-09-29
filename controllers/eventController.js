import Event from '../models/Event.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Private / Public
export const getEvents = async (req, res, next) => {
  try {
    const { category, timeframe } = req.query;
    const query = {};

    if (category && category !== 'All') query.category = category;

    if (timeframe === 'upcoming') {
      query.eventDate = { $gte: new Date() };
    } else if (timeframe === 'past') {
      query.eventDate = { $lt: new Date() };
    }

    const events = await Event.find(query).sort({ eventDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Private / Public
export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin, Faculty)
export const createEvent = async (req, res, next) => {
  try {
    const { title, description, eventDate, startTime, endTime, venue, organizer, category, bannerImage } = req.body;

    if (!title || !eventDate) {
      return res.status(400).json({
        success: false,
        message: 'Event title and event date are required',
      });
    }

    const event = await Event.create({
      title,
      description: description || '',
      eventDate: new Date(eventDate),
      startTime: startTime || '10:00 AM',
      endTime: endTime || '04:00 PM',
      venue: venue || 'Main Campus Auditorium',
      organizer: organizer || 'Department Committee',
      category: category || 'Academic',
      bannerImage: bannerImage || '',
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin, Faculty)
export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Event removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
