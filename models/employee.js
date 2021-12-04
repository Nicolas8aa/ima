const { Schema, model } = require("mongoose");
const userSchema = require("./userSchema");

const employeeSchema = new Schema(
  {
    userData: userSchema,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("Employee", employeeSchema);
