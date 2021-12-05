const { Router } = require("express");
const { getMarkets, postMarket } = require("../controllers/market");

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
const { check } = require("express-validator");

const router = Router();

router.get("/", getMarkets); // next feature
router.post(
  "/",
  [
    validateJWT,
    isAdmin,
    check("name", "Name is required").notEmpty(),
    validateFields,
  ],
  postMarket
);

module.exports = router;
