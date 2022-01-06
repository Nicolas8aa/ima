const slugify = require("slugify");
const uniqueSlug = require("unique-slug");
const { User, Store } = require("../models");

const getStores = async (req, res) => {
  let { limit = 10, start = 0 } = req.query;
  const user = req.user;
  const filter = { owner: user.uid };

  const [total, stores] = await Promise.all([
    Store.countDocuments(filter),
    Store.find(filter).limit(limit).skip(start),
  ]);

  res.json({
    total,
    results: stores ? [stores] : [],
  });
};

const getStore = async (req, res) => {
  const { id } = req.params;

  const store = await Store.findById(id);
  res.json({ results: [store] });
};

const postStore = async (req, res) => {
  const { name } = req.body;
  // Validating

  if (!req.user) return res.json({ msg: "User not logged" });
  const currentUser = req.user;

  const store = new Store({ name, owner: currentUser.uid });

  // Add store to user
  const userDB = await User.findByIdAndUpdate(currentUser.uid, {
    store: store._id,
  });

  // Creating unique slug
  const nameSlug = slugify(name, { remove: /[*+~.()'"!:@]/g, lower: true });
  store.slug = nameSlug + "-" + uniqueSlug(store.name);

  // Saving store
  await store.save();

  res.json({
    store,
  });
};

const putStore = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { uid } = req.user;

  // Validate if he is the owner

  const store = await Store.findOneAndUpdate(
    { owner: uid, _id: id },
    { name },
    { new: true }
  );

  res.json({ store });
};

const deleteStore = async (req, res) => {
  const { id } = req.params;

  const store = await Store.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json({ store });
};

module.exports = {
  getStores,
  getStore,
  postStore,
  putStore,
  deleteStore,
};
