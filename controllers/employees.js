const { User, Employee } = require("../models");
const bcrypt = require("bcryptjs");

const getEmployees = (req, res) => {
  res.json({
    msg: "Getting users",
  });
};

const postEmployee = async (req, res) => {
  const { name, email, password } = req.body;

  // Validations

  // Create user for employee

  const user = new User({ name, email });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  user.role = "USER";

  // Create employee
  const employee = new Employee({ userData: user });

  // Save to db employee

  await employee.save();

  res.json({
    msg: "Posting employees",
    employee,
  });
};

const putEmployee = (req, res) => {
  res.json({
    msg: "Putting employees",
  });
};

const deleteEmployee = (req, res) => {
  res.json({
    msg: "Deleting employees",
  });
};

module.exports = { getEmployees, postEmployee, putEmployee, deleteEmployee };
