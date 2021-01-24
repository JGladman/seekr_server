const mongoose = require('mongoose');

/*const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
});*/

const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
