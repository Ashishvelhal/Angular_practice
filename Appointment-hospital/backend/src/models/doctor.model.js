const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false
  },
  licenseNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  experienceYears: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  consultationFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // This is the table name
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  timestamps: true,
  tableName: 'doctors'
});

// Define associations
Doctor.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Doctor, { foreignKey: 'userId', as: 'doctor' });

module.exports = Doctor;
