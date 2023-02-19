const user = require("../models/user.js");

// define the migration function
async function newTransaction(req, res) {
  const User = await user.findOne({ username: req.body.username });

  let data = {};
  data["timeStamp"] = Date.now();
  data["transactionHash"] = req.body.transactionHash;
  data["tokenReward"] = req.body.tokenReward;
  User.transaction = [];
  User.transaction.push(data);
  await User.save();

  return res.status(200).json({
    message: "Successfull transaction",
  });
}

module.exports = { newTransaction };
