const router = require("express").Router();
const {
  newTransaction,
  getUserTransactions,
} = require("../Controllers/transaction.js");

router.post("/newTransaction", newTransaction);

// Route to get a user's transactions
router.get("/users/:username", getUserTransactions);

module.exports = router;
