const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');

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

app.listen(port, () => {
  console.log(`Express server is running on localhost:${port}`);
});

// async function createUser(username) {
//   return new User({
//     username,
//   }).save();
// }

// async function findUser(username) {
//   return await User.findOne({ username });
// }

// (async () => {
//   const connector = mongoose.connect(connectionString);
//   const username = process.argv[2].split('=')[1];

//   let user = await connector.then(async () => {
//     return findUser(username);
//   });

//   if (!user) {
//     user = await createUser(username);
//   }

//   console.log(user);
//   process.exit(0);
// })();
