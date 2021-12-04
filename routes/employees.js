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

router.get("/", [validateJWT, isAdmin, validateFields], getEmployees);

router.post("/", postEmployee);

router.put("/:id", putEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;
