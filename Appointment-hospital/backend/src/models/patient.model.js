const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: true,
      isBeforeToday(value) {
        if (value && new Date(value) >= new Date()) {
          throw new Error('Date of birth must be before today');
        }
      }
    }
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true,
    validate: {
      isIn: [['male', 'female', 'other']]
    }
  },
  bloodType: {
    type: DataTypes.STRING(5),
    allowNull: true,
    validate: {
      isIn: [['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']]
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 500]
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 100]
    }
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 100]
    }
  },
  zipCode: {
    type: DataTypes.STRING(10),
    allowNull: true,
    validate: {
      is: /^[0-9]{5}(-[0-9]{4})?$/i // US ZIP code format
    }
  },
  emergencyContactName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 100]
    }
  },
  emergencyContactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^[0-9]{10}$/ // 10-digit phone number
    }
  },
  medicalHistory: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 5000]
    }
  },
  allergies: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 1000]
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  timestamps: true,
  tableName: 'patients',
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['bloodType']
    },
    {
      fields: ['city']
    }
  ]
});

// Define associations
Patient.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Patient, { foreignKey: 'userId', as: 'patient' });

module.exports = Patient;
