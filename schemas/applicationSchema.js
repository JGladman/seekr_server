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
  status: {
    type: String,
    required: [true, 'Status is required'],
  },
  applicationStep: {
    type: Enumerator,
    required: [true, 'Status is required'],
  },
  priority: {
    type: int,
    required: [false],
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
