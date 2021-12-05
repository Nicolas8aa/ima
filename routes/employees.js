const { Router } = require("express");

// Custom middlewares
const {
  validateFields,
  validateJWT,
  isAdmin,
  hasRole,
} = require("../middlewares");

const {
  isValidRole,
  existEmail,
  existUser,
} = require("../helpers/dbValidators");

// Controllers
const {
  getEmployees,
  postEmployee,
  putEmployee,
  deleteEmployee,
} = require("../controllers/employees");

const router = Router();

const adminValidations = [validateJWT, isAdmin, validateFields];

router.get("/", [].concat(adminValidations), getEmployees);

router.post("/", [].concat(adminValidations), postEmployee);

router.put("/:id", [].concat(adminValidations), putEmployee);

router.delete("/:id", [].concat(adminValidations), deleteEmployee);

module.exports = router;
