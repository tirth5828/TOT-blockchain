const express = require("express");
const router = express.Router();

const { auth } = require(".././middlewares/auth");

// const e = require("express");
const { register, updateData, getUser } = require("../Controllers/user");

// adding new user (sign-up route)
router.post("/register", register);
router.post('/getUser', getUser);

router.put("/updateLeetData", auth, updateData);

module.exports = router;
