const { Schema, model, SchemaType } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    units: { type: Number, default: 10 },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    price: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
