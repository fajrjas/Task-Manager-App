const express = require("express");
const router = express.Router();

const { logout, login, signup } = require("../controller/authController");

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
