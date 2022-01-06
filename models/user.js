const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: { type: String, required: [true, "Password is required"] },
  img: { type: String },
  store: { type: Schema.Types.ObjectId, ref: "Store" },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
  state: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

userSchema.methods.toJSON = function () {
  const { __v, password, google, state, _id, ...user } = this.toObject();

  user.uid = _id;
  return user;
};

module.exports = model("User", userSchema);
