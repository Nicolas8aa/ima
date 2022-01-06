const { Product, Category } = require("../models");
const { isValidObjectId } = require("mongoose");

const getProducts = async (req, res) => {
  let { category = "", limit = 10, start = 0 } = req.query;
  const { storeId } = req.params;
  const filter = { store: storeId };

  // Validate category
  if (category !== "" && isValidObjectId(category)) {
    // Just by id
    filter.category = category;
  }

  const [total, products] = await Promise.all([
    await Product.countDocuments(filter),
    await Product.find(filter).skip(start).limit(limit),
  ]);

  res.json({
    total,
    products,
  });
};

const getProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  res.json({ product });
};

const postProduct = async (req, res) => {
  const { name, units, category, price } = req.body;
  const user = req.user;
  const { storeId } = req.params;

  // Validate category
  if (category) {
    if (!isValidObjectId(category))
      return res.status(400).json({ msg: "Invalid category" });
    const categoryDB = await Category.findOne({ _id: category, store });
    if (!categoryDB)
      return res.status(400).json({ msg: "Category does not exist :c" });
  }

  // Create product
  const product = new Product({
    name,
    units,
    category,
    price,
    createdBy: user.uid,
    store: storeId,
  });

  try {
    await product.save();
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong, try again" });
  }
};

const putProduct = async (req, res) => {
  res.json({ msg: "put product" });
};

module.exports = { getProducts, postProduct, getProduct };
