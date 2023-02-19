const router = require("express").Router();
const { newTransaction } = require("../Controllers/transaction.js");

router.post("/newTransaction", newTransaction);
module.exports = router;
