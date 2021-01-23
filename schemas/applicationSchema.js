const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company Name is required'],
  },
  jobTitle: {
    type: String,
    required: [true, 'Job Title is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  applicationStep: {
    type: Number,
    required: [true, 'Step is required'],
    min: 0,
    max: 4,
    default: 0,
  },
  priority: {
    type: Number,
    required: [false],
    default: 1,
    min: 1,
    max: 5,
  },
  notes: {
    type: String,
    required: [false],
  },
  dateApplied: {
    type: String,
    required: [true, 'Date applied is required'],
  },
  interviewDate: {
    type: String,
    required: [true, 'Company Name is required'],
  },
});

module.exports = {
  applicationSchema,
};
