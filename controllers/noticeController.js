import Notice from '../models/Notice.js';

// @desc    Get all active notices
// @route   GET /api/notices
// @access  Private
export const getNotices = async (req, res, next) => {
  try {
    const { category, priority, audience, keyword } = req.query;
    const query = {};

    if (category && category !== 'All') query.category = category;
    if (priority && priority !== 'All') query.priority = priority;
    if (audience && audience !== 'All') {
      query.targetAudience = { $in: [audience, 'All'] };
    }

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { content: { $regex: keyword, $options: 'i' } },
      ];
    }

    const notices = await Notice.find(query)
      .populate('author', 'name email role department')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notices.length,
      notices,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get notice by ID
// @route   GET /api/notices/:id
// @access  Private
export const getNoticeById = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id).populate('author', 'name email role department');

    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    res.status(200).json({
      success: true,
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new notice
// @route   POST /api/notices
// @access  Private (Admin, Faculty)
export const createNotice = async (req, res, next) => {
  try {
    const { title, content, category, targetAudience, priority, expiryDate } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
      });
    }

    const notice = await Notice.create({
      title,
      content,
      category: category || 'General',
      targetAudience: targetAudience || 'All',
      priority: priority || 'Normal',
      author: req.user._id,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
    });

    const populated = await Notice.findById(notice._id).populate('author', 'name email role');

    res.status(201).json({
      success: true,
      message: 'Notice published successfully',
      notice: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update notice
// @route   PUT /api/notices/:id
// @access  Private (Admin, Faculty)
export const updateNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    const updated = await Notice.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).populate(
      'author',
      'name email role'
    );

    res.status(200).json({
      success: true,
      message: 'Notice updated successfully',
      notice: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete notice
// @route   DELETE /api/notices/:id
// @access  Private (Admin)
export const deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    await Notice.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Notice removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
