const express = require('express');
const router = express.Router();

// @route   GET /api/patients
// @desc    Get all patients
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Patients endpoint' });
});

// @route   GET /api/patients/:id
// @desc    Get patient by ID
// @access  Private
router.get('/:id', (req, res) => {
  res.json({ message: 'Patient details endpoint' });
});

module.exports = router;
