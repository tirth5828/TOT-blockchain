const User = require("../models/user");
const fetch = require("node-fetch");

const register = async (req, res) => {
  let obj = req.body;
  const requestBody = {
    operationName: "getUserProfile",
    username: req.body.username,
  };
  const headers = {
    "Content-Type": "application/json",
  };
  const API_BASE_URL = "https://b150j.sse.codesandbox.io/user-profile/";
  let data;
  try {
    const response = await fetch(API_BASE_URL + "user-profile", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch user profile");
    }
    data = await response.json();
  } catch (err) {
    console.log(err);
  }
  const leetFullDataJson = await data.json();
  obj["oldEasySolved"] =
    leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[1].count;
  obj["oldMediumSolved"] =
    leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[2].count;
  obj["oldHardSolved"] =
    leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[3].count;

  let newUser = new User(obj);

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .json({ auth: false, message: "email already exits" });
  }
  user = await User.findOne({ username: req.body.username });
  if (user) {
    return res
      .status(400)
      .json({ auth: false, message: "Username already exits" });
  }

  try {
    const savedUser = newUser.save();
    res.status(201).json(savedUser);

    res.status(201).json(savedTransactionUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateData = async (req, res) => {
  let user = await User.findOne(req.user._id);

  const requestBody = {
    operationName: "getUserProfile",
    username: req.body.username,
  };
  const headers = {
    "Content-Type": "application/json",
  };
  const API_BASE_URL = "https://b150j.sse.codesandbox.io/user-profile/";
  let data;
  try {
    const response = await fetch(API_BASE_URL + "user-profile", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch user profile");
    }
    data = await response.json();
  } catch (err) {
    console.log(err);
  }
  const leetFullDataJson = await data.json();
  if (
    leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[1].count ==
      user.oldEasySolved &&
    leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[2].count ==
      user.oldMediumSolved &&
    leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[3].count ==
      user.oldHardSolved
  ) {
    return res.status(400).json({
      message: "No new data found",
    });
  } else {
    user["numEasySolved"] =
      leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[1]
        .count - user.oldEasySolved;
    user.oldEasySolved =
      leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[1];
    user["numMediumSolved"] =
      leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[2]
        .count - user.oldMediumSolved;
    user.oldMediumSolved =
      leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[2];
    user["numHardSolved"] =
      leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[3]
        .count - user.oldHardSolved;
    user.oldHardSolved =
      leetFullDataJson.data.matchedUser.submitStats.totalSubmissionNum[3];
    try {
      await user.save();
      res.status(200).send({
        message: "successfully updated",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = {
  register,
  updateData,
};
