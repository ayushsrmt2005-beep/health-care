// models/User.js

const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Automatically generate ObjectId for the _id field
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['patient', 'doctor'], // Can only be 'patient' or 'doctor'
    default: 'patient', // Default role is 'patient'
  },
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);