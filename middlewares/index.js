const fieldValidation = require("../middlewares/fieldValidation");
const JWTValidation = require("../middlewares/validateJWT");
const roleValidation = require("../middlewares/validateRole");
const storeValidators = require("./validateStore");

module.exports = {
  ...fieldValidation,
  ...JWTValidation,
  ...roleValidation,
  ...storeValidators,
};
