const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance without database first
const sequelizeWithoutDB = new Sequelize(
  '', // empty database name
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '12345678',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

// Create Sequelize instance with database
const sequelize = new Sequelize(
  process.env.DB_NAME || 'hospital_appointment',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '12345678',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = { sequelize, sequelizeWithoutDB };
