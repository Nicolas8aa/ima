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

router.get("/", [...adminValidations], getEmployees);

router.post("/", [...adminValidations], postEmployee);

router.put("/:id", [...adminValidations], putEmployee);

router.delete("/:id", [...adminValidations], deleteEmployee);

module.exports = router;
