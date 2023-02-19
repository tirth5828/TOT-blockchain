const user = require("../models/user.js");

// define the migration function
async function newTransaction(req, res) {
  const User = await user.findOne({ username: req.body.username });

  let data = {};
  data["timeStamp"] = Date.now();
  data["transactionHash"] = req.body.transactionHash;
  data["tokenReward"] = req.body.tokenReward;

  User.transaction.push(data);
  await User.save();

  return res.status(200).json({
    message: "Successfull transaction",
  });
}

async function getUserTransactions(req, res) {
  try {
    const transactions = await user.findOne({ username: req.params.username });
    return res.status(200).json({
      transactionData: transactions.transaction,
      numEasy: transactions.numEasySolved,
      numMedium: transactions.numMediumSolved,
      numHard: transactions.numHardSolved,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching transactions");
  }
}

module.exports = { newTransaction, getUserTransactions };
