const { Schema, model, SchemaTypes } = require("mongoose");

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    slug: { type: String, required: true },
    products: [{ type: SchemaTypes.ObjectId, ref: "Product" }],
    roles: [{ type: SchemaTypes.ObjectId, ref: "Role" }],
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

storeSchema.methods.toJSON = function () {
  const { __v, ...store } = this.toObject();

  return store;
};

module.exports = model("Store", storeSchema);
