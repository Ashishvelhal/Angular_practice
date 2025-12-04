const express = require('express');
const router = express.Router();

// @route   GET /api/appointments
// @desc    Get all appointments
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Appointments endpoint' });
});

// @route   POST /api/appointments
// @desc    Create new appointment
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'Create appointment endpoint' });
});

module.exports = router;
