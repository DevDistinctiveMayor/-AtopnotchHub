const MeetingHistory = require('../../model/schema/meeting');
const mongoose = require('mongoose');

// ✅ Create a new meeting
const add = async (req, res) => {
  try {
    const meeting = new MeetingHistory(req.body);
    const savedMeeting = await meeting.save();
    res.status(201).json({ message: 'Meeting created successfully', data: savedMeeting });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all non-deleted meetings
const index = async (req, res) => {
  try {
    const meetings = await MeetingHistory.find({ deleted: false })
      .populate('attendes')
      .populate('attendesLead')
      .populate('createBy');
    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get one meeting by ID
const view = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await MeetingHistory.findById(id)
      .populate('attendes')
      .populate('attendesLead')
      .populate('createBy');
    if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
    res.status(200).json(meeting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Soft delete one meeting by ID
const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MeetingHistory.findByIdAndUpdate(id, { deleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ error: 'Meeting not found' });
    res.status(200).json({ message: 'Meeting soft-deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Soft delete multiple meetings by IDs
const deleteMany = async (req, res) => {
  try {
    const { ids } = req.body; // expects { ids: [id1, id2, ...] }
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'Invalid input, expected array of IDs' });
    }
    await MeetingHistory.updateMany(
      { _id: { $in: ids } },
      { $set: { deleted: true } }
    );
    res.status(200).json({ message: 'Selected meetings deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { add, index, view, deleteData, deleteMany };
