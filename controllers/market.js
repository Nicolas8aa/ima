const slugify = require("slugify");

const Market = require("../models/market");
const Admin = require("../models/admin");

const getMarkets = async (req, res) => {
  res.json({
    msg: "Get all markets (next feature)",
  });
};

const postMarket = async (req, res) => {
  const { name } = req.body;
  // Validating

  if (!req.user) return res.json({ msg: "Admin not found" });
  const user = req.user;
  console.log(user);
  // Verify if admin has an admin account
  let admin = await Admin.findOne({ adminData: user });
  if (!admin) {
    admin = await Admin({ adminData: user });
  }

  const market = await Market({ name, owner: admin.aid });
  admin.market = market.mid;

  // Creating unique slug
  const nameSlug = slugify(name, { remove: /[*+~.()'"!:@]/g, lower: true });
  market.slug = nameSlug;

  // Saving market and admin

  await market.save();
  await admin.save();

  res.json({
    msg: "Posting market",
    // market,
  });
};

module.exports = {
  getMarkets,
  postMarket,
};
