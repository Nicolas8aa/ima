const { Schema, model, SchemaType } = require("mongoose");

const adminSchema = new Schema({
  adminInfo: { type: Schema.Types.Subdocument, ref: "User" },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
});

module.exports = model("Admin", adminSchema);
