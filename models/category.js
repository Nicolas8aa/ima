const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  keyword: [{ type: String, required: true }],
  store: { type: Schema.Types.ObjectId, required: true },
});

categorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  category.cid = _id;

  return category;
};

module.exports = model("Category", categorySchema);
