const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Doctor = require('./doctor.model');
const Patient = require('./patient.model');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  appointmentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled', 'no_show'),
    defaultValue: 'scheduled'
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'doctors',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'patients',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  timestamps: true,
  tableName: 'appointments',
  indexes: [
    // For faster lookups
    { fields: ['appointmentDate', 'doctorId', 'startTime'], unique: true },
    { fields: ['patientId'] },
    { fields: ['status'] }
  ]
});

// Define associations
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

Doctor.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });
Patient.hasMany(Appointment, { foreignKey: 'patientId', as: 'appointments' });

module.exports = Appointment;
