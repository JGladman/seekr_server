const mongoose = require('mongoose');

const { applicationSchema } = require('../schemas/applicationSchema');

//class for creating an application
const Application = mongoose.model('Application', applicationSchema);

//create application
const createApplication = (req, res) => {
  // outputs date in format dd-mm-yyyy
  const curDate = () => {
    date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '-' + mm + '-' + yyyy;
  };

  const {
    companyName,
    jobTitle,
    category,
    priority,
    notes,
    interviewDate,
  } = req.body;

  const application = new Application({
    companyName: companyName,
    jobTitle: jobTitle,
    category: category,
    applicationStep: 0,
    priority: priority,
    notes: notes,
    dateApplied: curDate(),
    interviewDate: interviewDate,
  });

  //save new application to db
  application.save((err, application) => {
    if (err) {
      res.send(err.errors);
      return console.error(err);
    }
    console.log(application);
    res.send(application);
  });
};

//read all applications
const readAllApplications = (req, res) => {
  Application.find((err, applications) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.send(applications);
  });
};

//read specific application
const readApplication = (req, res) => {
  Application.findById(req.params.id, (err, application) => {
    if (err) {
      res.send(err);
      return console.error(err);
    }
    res.send(application);
  });
};

//update application
const updateApplication = (req, res) => {
  let foundApplication;
  Application.findById(req.params.id, (err, application) => {
    if (err) {
      res.send(err);
      return console.error(err);
    }
    if (!application)
      throw new Error(`Error: Application of ID: ${req.params.id} not found`);

    //foundApplication = application
    if (req.body.jobTitle) application.jobTitle = req.body.jobTitle;
    if (req.body.category) application.category = req.body.category;
    if (req.body.priority) application.priority = req.body.priority;
    if (req.body.notes) application.notes = req.body.notes;
    if (req.body.interviewDate)
      application.interviewDate = req.body.interviewDate;
    if (req.body.applicationStep)
      application.applicationStep = req.body.applicationStep;

    application.save((err, application) => {
      if (err) {
        res.send(err.errors);
        return console.error(err);
      }
      console.log(application);
      res.send(application);
    });
  });
};

//delete application
const deleteApplication = (req, res) => {
  Application.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.send(err);
      return console.error(err);
    }
    res.send({ status: 200 });
  });
};

//read sorted by category
const sortCategory = (req, res) => {
  const applications = Application.find()
    .sort({ category: desc })
    .all((applications, err) => {
      if (err) {
        res.send(err);
        return console.log(err);
      }
      res.send(allApps);
    });
};

//read sorted by job title
const sortJobTitle = (req, res) => {
  const applications = Application.find()
    .sort({ jobTitle: 'asc' })
    .exec((err, applications) => {
      if (err) {
        res.send(err);
        return console.log(err);
      }
      res.send(applications);
    });
};
//read sorted by company
//read sorted by priority
//read sorted by step

module.exports = {
  createApplication,
  readAllApplications,
  readApplication,
  updateApplication,
  deleteApplication,
  sortJobTitle,
};
