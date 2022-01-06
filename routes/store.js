const { Router } = require("express");
const { check, body, query } = require("express-validator");

// Custom middlewares
const {
  validateFields,
  validateJWT,
  hasRole,
  belongsStore,
} = require("../middlewares");

// Helpers
const {} = require("../helpers/dbValidators");

// Controllers
const {
  getStores,
  postStore,
  getStore,
  putStore,
  deleteStore,
} = require("../controllers/store");

const router = Router();

router.get(
  "/",
  [
    validateJWT,
    query("limit", "Limit query param must be a number").isNumeric(),
    query("start", "Start query param must be a number").isNumeric(),
    validateFields,
  ],
  getStores
);

router.get(
  "/:id",
  [
    validateJWT,
    check("id").custom((id, { req }) => belongsStore(id, req.user)),
    validateFields,
  ],
  getStore
);

router.post(
  "/",
  [
    validateJWT,
    // userHasStore,
    check("name", "Name is required").notEmpty(),
    body("name").trim().escape(),
    validateFields,
  ],
  postStore
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Nothing to update").notEmpty(),
    body("name").trim().escape(),
    check("id").custom((id, { req }) => belongsStore(id, req.user)),
    validateFields,
  ],
  putStore
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id").custom((id, { req }) => belongsStore(id, req.user)),
    validateFields,
  ],
  deleteStore
);

module.exports = router;
