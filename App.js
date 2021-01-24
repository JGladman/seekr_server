const express = require('express');
const mongoose = require('mongoose');
//const morgan = require('morgan')
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');
const env = require('dotenv').config({ path: './.env' });

const applications = require('./queries/applicationQueries');
//const AuthRoute = require('./routes/auth.js')
const AuthController = require ('./controllers/AuthController')

const app = express();
//app.use(morgan('dev'));
app.use(pino);
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const port = 3001;

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongoDB');
});

app.get('/', (req, res) => {
  res.json({ info: 'Hello world' });
});

app.post('/applications', applications.createApplication);
app.get('/applications', applications.readAllApplications);
app.get('/applications/:id', applications.readApplication);
app.put('/applications/:id', applications.updateApplication);
app.delete('/applications/:id', applications.deleteApplication);
app.get('/applications/sort/category', applications.sortCategory);
app.get('/applications/sort/job', applications.sortJobTitle);
app.get('/applications/sort/company', applications.sortCompanyName);
app.get('/applications/sort/priority', applications.sortPriority);
app.get('/applications/sort/step', applications.sortApplicationStep);
app.post('/auth/register', AuthController.register);
app.post('/auth/login', AuthController.login);

//app.use('/auth', AuthRoute)

app.listen(port, () => {
  console.log(`Express server is running on localhost:${port}`);
});