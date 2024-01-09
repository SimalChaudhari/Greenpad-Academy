const db = require("../models");

const User = db.User;

// Check Duplicate Email
const checkDuplicateEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to check duplicate email." });
  }
};

const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp;
