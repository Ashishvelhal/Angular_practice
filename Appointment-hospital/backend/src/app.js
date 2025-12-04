require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, sequelizeWithoutDB } = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const doctorRoutes = require('./routes/doctor.routes');
const patientRoutes = require('./routes/patient.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Hospital Appointment API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Create database and start server
const startServer = async () => {
  try {
    // First connect without database to create it
    await sequelizeWithoutDB.authenticate();
    console.log('MySQL connection established successfully.');
    
    // Create database if it doesn't exist
    await sequelizeWithoutDB.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'hospital_appointment'}\`;`);
    console.log('Database created or already exists.');
    
    // Now connect with the database
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database synced');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

module.exports = app;
