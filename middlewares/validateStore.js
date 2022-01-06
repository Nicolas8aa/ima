const { isValidObjectId } = require("mongoose");
const { Store, User, Product } = require("../models");

const userHasStore = async (req, res, next) => {
  const currentUser = req.user;
  const user = await User.findById(currentUser.uid);

  if (user.store)
    return res.json({ msg: "Admin can have only one store, for now :)" });

  next();
};

const belongsStore = async (id, user) => {
  if (!isValidObjectId(id)) throw new Error("Invalid store id");
  const store = await Store.findOne({ _id: id, owner: user.uid });
  if (!store) {
    throw new Error(`Store with id ${id} does not exist`);
  }
};
const productExist = async (req, res, next) => {
  const { productId, storeId } = req.params;

  // Valid product Id
  if (!isValidObjectId(productId))
    return res.status(400).json({ msg: "Invalid product id" });

  const product = await Product.findOne({ store: storeId, _id: productId });
  if (!product) return res.status(400).json({ msg: "Product does not exist" });
  next();
};

module.exports = { userHasStore, belongsStore, productExist };
