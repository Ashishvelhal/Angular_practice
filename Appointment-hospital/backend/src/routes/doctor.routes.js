const express = require('express');
const router = express.Router();

// @route   GET /api/doctors
// @desc    Get all doctors
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Doctors endpoint' });
});

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
router.get('/:id', (req, res) => {
  res.json({ message: 'Doctor details endpoint' });
});

module.exports = router;
