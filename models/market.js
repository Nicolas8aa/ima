const { Schema, model, SchemaTypes } = require("mongoose");

const marketSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    owner: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    slug: { type: String, required: true },
    products: [{ type: SchemaTypes.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

marketSchema.methods.toJSON = function () {
  const { __v, _id, ...market } = this.toObject();

  market.mid = _id;
  return market;
};

module.exports = model("Maket", marketSchema);
