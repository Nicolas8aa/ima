const { Schema, model, SchemaType } = require("mongoose");
const userSchema = require("./userSchema");

const adminSchema = new Schema({
  adminData: userSchema,
  market: { type: Schema.Types.ObjectId, ref: "Market" },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
});

adminSchema.methods.toJSON = function () {
  const { __v, _id, ...admin } = this.Object();

  admin.aid = _id;
  return admin;
};

module.exports = model("Admin", adminSchema);
