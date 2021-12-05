const { Schema, model, SchemaType } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    units: { type: Number, required: true, default: 10 },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    price: { type: Schema.Types.Decimal128, required: true, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
