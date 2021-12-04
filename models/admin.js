const { Schema, model, SchemaType } = require("mongoose");
const userSchema = require("./userSchema");

const adminSchema = new Schema({
  adminData: userSchema,
  market: { type: Schema.Types.ObjectId, ref: "Market" },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
});

module.exports = model("Admin", adminSchema);
