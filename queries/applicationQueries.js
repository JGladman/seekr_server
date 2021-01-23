const mongoose = require('mongoose');

const { applicationSchema } = require('../schemas/applicationSchema');

const Application = mongoose.model('Application', applicationSchema);

const createApplication = (req, res) => {
  const {
    companyName,
    jobTitle,
    category,
    priority,
    notes,
    dateApplied,
    interviewDate,
  } = req.body;
  const application = new Application({
    companyName: companyName,
    jobTitle: jobTitle,
    category: category,
    applicationStep: 0,
    priority: priority,
    notes: notes,
    dateApplied: dateApplied,
    interviewDate: interviewDate,
  });
  application.save((err, application) => {
    if (err) return console.error(err);
    console.log(application);
    res.send(application);
  });
};

const deleteApplication = (req, res) => {};

module.exports = {
  createApplication,
};
