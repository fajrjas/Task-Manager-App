const express = require("express");
const router = express.Router();
const {
  landingPage,
  loginPage,
  signupPage,
  taskPage,
  editPage,
  logout,
} = require("../controller/pageController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", landingPage);
router.get("/login", loginPage);
router.get("/signup", signupPage);
router.get("/logout", logout);
router.get("/task", requireAuth, taskPage);
router.get("/edit-task", requireAuth, editPage);

module.exports = router;
