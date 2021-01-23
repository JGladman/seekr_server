const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');

const applications = require('./queries/applicationQueries');

const app = express();
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
app.delete('/applications/:id', applications.deleteApplication);

app.listen(port, () => {
  console.log(`Express server is running on localhost:${port}`);
});
