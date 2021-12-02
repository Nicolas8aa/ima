const { Router } = require("express");
const { getUsers, postUsers } = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.post("/", postUsers);

module.exports = router;
