const req = require('express/lib/request');
const User = require('../models/User');

async function register(session, username, password) {
  const user = new User({
    username,
    hashedPassword: password
  });
  await user.save();

  session.user = {
    id: user._id,
    username: user.username
  }
}

async function login(session, username, password) {
  const user = await User.findOne({ username });
  console.log(user);

  if(user && await user.comparePassword(password)) {

    session.user = {
      id: user._id,
      username: user.username
    }

    return true;
  } else {
    throw new Error('Incorrect username or password!'); 
  }
}

module.exports = () => (req, res, next) => {
  req.auth = {
    register: (...params) => register(req.session, ...params),
    login: (...params) => login(req.session, ...params)
  };

  next();
}