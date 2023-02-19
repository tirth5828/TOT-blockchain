const express = require("express");
const router = express.Router();

const { auth } = require(".././middlewares/auth");

// const e = require("express");
const { register, updateData } = require("../Controllers/user");

// adding new user (sign-up route)
router.post("/register", register);

router.put("/updateLeetData", auth, updateData);

module.exports = router;
