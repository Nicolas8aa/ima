const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getUsers = (req, res) => {
  res.redirect("/");
};

const postUsers = (req, res) => {
  const { name, email, password } = req.body;
  res.json({
    name,
    email,
    password,
  });
};

module.exports = { getUsers, postUsers };
