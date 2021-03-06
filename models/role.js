const { Schema, model } = require("mongoose");


const roleSchema = new Schema({

  role: {
    type: String,
    required: [true, "Role is required"],
  },

  owner: { type: Schema.Types.ObjectId, ref: "Admin" },
});

module.exports = model("Role", roleSchema);


