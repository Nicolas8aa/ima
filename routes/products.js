const { Router } = require("express");
const { body, check, query } = require("express-validator");

// Helpers
const { validCategory } = require("../helpers/dbValidators");
// Controllers
const { getProducts, postProduct, getProduct } = require("../controllers");

// Middlewares
const {
  validateJWT,
  validateFields,
  belongsStore,
  productExist,
} = require("../middlewares");

const router = Router();

router.get(
  "/:storeId/",
  [
    validateJWT,
    check("storeId").custom((id, { req }) => belongsStore(id, req.user)),
    query("limit", "Limit query param must be a number").isNumeric(),
    query("start", "Start query param must be a number").isNumeric(),
    validateFields,
  ],
  getProducts
);

router.get(
  "/:storeId/:productId",
  [
    validateJWT,
    check("storeId").custom((id, { req }) => belongsStore(id, req.user)),
    productExist,
    validateFields,
  ],
  getProduct
);

router.post(
  "/:storeId/",
  [
    validateJWT,
    check("storeId").custom((id, { req }) => belongsStore(id, req.user)),
    body("name").trim().notEmpty(),
    validateFields,
  ],
  postProduct
);

module.exports = router;
