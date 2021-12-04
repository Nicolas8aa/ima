const { Schema, model, SchemaTypes } = require("mongoose");
const userSchema = require("./userSchema");

const employeeSchema = new Schema(
  {
    userData: userSchema,
    owner: { type: SchemaTypes.ObjectId, ref: "Admin" },
    market: { type: SchemaTypes.ObjectId, ref: "Market" },
  },
  { timestamps: true }
);

module.exports = model("Employee", employeeSchema);
