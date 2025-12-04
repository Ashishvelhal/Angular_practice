const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth.middleware');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('role', 'Role is required').isIn(['patient', 'doctor']),
    check('phone', 'Please include a valid phone number').optional().isMobilePhone(),
    // Additional validation for doctor registration
    check('specialization', 'Specialization is required for doctors').if(
      (req) => req.body.role === 'doctor'
    ).notEmpty(),
    check('licenseNumber', 'License number is required for doctors').if(
      (req) => req.body.role === 'doctor'
    ).notEmpty(),
    check('consultationFee', 'Consultation fee is required for doctors').if(
      (req) => req.body.role === 'doctor'
    ).isNumeric()
  ],
  authController.register
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getMe);

// @route   POST /api/auth/refresh-token
// @desc    Refresh access token
// @access  Public
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
