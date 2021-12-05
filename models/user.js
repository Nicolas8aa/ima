const { model } = require("mongoose");


const userSchema = require("./userSchema");

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();

  user.uid = _id;
  return user;
};

module.exports = model("User", userSchema);
