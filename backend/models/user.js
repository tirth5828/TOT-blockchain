var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const salt = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  oldEasySolved: {
    type: Number,
    default: 0,
    required: true,
  },
  oldMediumSolved: {
    type: Number,
    default: 0,
    required: true,
  },
  oldHardSolved: {
    type: Number,
    default: 0,
    required: true,
  },
  metamaskid: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  numEasySolved: {
    type: [Number],
    default: 0,
  },
  numMediumSolved: {
    type: [Number],
    default: 0,
  },
  numHardSolved: {
    type: [Number],
    default: 0,
  },
  transaction: [
    {
      tokenReward: {
        type: Number,
        default: 0,
      },
      transactionHash: {
        type: String,
        trim: true,
        unique: true,
      },
      timeStamp: {
        type: String,
        trim: true,
        unique: true,
      },
    },
  ],
  token: {
    type: String,
  },
});

// generate token
userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// find by token
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, process.env.SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

//delete token

userSchema.methods.deleteToken = function (token, cb) {
  var user = this;

  user.updateOne({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model("User", userSchema);
