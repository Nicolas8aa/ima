const { Schema, model, SchemaTypes } = require("mongoose");

const employeeSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "Password is required"] },
    boss: { type: SchemaTypes.ObjectId, ref: "User" },
    workingAt: { type: SchemaTypes.ObjectId, ref: "Store" },
  },
  { timestamps: true }
);

module.exports = model("Employee", employeeSchema);
