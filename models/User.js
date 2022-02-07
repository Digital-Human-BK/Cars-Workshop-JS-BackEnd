const { model, Schema } = require('mongoose');
const { hashPassword, comparePassword } = require('../services/util');

const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3, unique: true },
  hashedPassword: { type: String, required: true }
});

userSchema.methods.comparePassword = async function (password) {
  return await comparePassword(password, this.hashedPassword);
};

// userSchema.pre('save', function(){
//   console.log('Saving', this);
// })

const User = model('User', userSchema);

module.exports = User;