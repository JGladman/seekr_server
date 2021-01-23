const mongoose = require("mongoose");
const userSchema = require("./schemas/userSchema.js");
const User = mongoose.model("user", userSchema, "user");

const connectionString = process.env.CONNECTION_STRING;

async function createUser(username) {
  return new User({
    username,
  }).save();
}

async function findUser(username) {
  return await User.findOne({ username });
}

(async () => {
  const connector = mongoose.connect(connectionString);
  const username = process.argv[2].split("=")[1];

  let user = await connector.then(async () => {
    return findUser(username);
  });

  if (!user) {
    user = await createUser(username);
  }

  console.log(user);
  process.exit(0);
})();
