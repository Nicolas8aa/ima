const { Router } = require("express");
const { check } = require("express-validator");

const { login, register } = require("../controllers");
const { validateFields } = require("../middlewares/fieldValidation");

const {
  isValidRole,
  existEmail,
  existUser,
} = require("../helpers/dbValidators");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required bro").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/register",
  [
    check("name", "Required name").not().isEmpty(),
    check("password", "Password must be higher than 6 chars").isLength({
      min: 6,
    }),
    check("email", "Invalid email").isEmail(),
    check("email").custom(existEmail),
    validateFields,
  ],
  register
);

module.exports = router;
