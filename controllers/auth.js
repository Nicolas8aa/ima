const bcryptjs = require("bcryptjs");
const { genJWT } = require("../helpers/genJWT");
const { User, Role } = require("../models");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if email exists

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        msg: "Email or password incorrect(s) - email",
      });

    // User is active
    if (!user.state)
      return res.status(400).json({
        msg: "Email or password incorrect(s) - inactive",
      });
    // Validate password
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword)
      return res.status(400).json({
        msg: "Email or password incorrect(s) - password",
      });

    // Generate JWT
    const token = await genJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Something went wrong :c",
    });
  }
};

const register = async (req, res) => {
  if (req.user)
    return res.status(400).json({
      msg: "User already authenticated",
    });

  // Create user
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email });

    // Hash password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Something went wrong :c",
    });
  }
};

module.exports = { login, register };
