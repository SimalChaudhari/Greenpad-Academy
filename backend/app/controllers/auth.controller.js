const config = require("../config/auth.config");
const cors = require("../config/cors.config");
const { sendEmail } = require("../common/email");
const _ = require('lodash');
const db = require("../models");

const User = db.User;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Registration
exports.registration = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      company_name,
      email,
      password,
      profession,
      address,
      country,
      post_code,
      role
    } = req.body;

    const user = new User({
      first_name,
      last_name,
      company_name,
      email,
      password: bcrypt.hashSync(password, 8),
      profession,
      address,
      country,
      post_code,
      role
    });

    await user.save();

    res.json({ message: "User was registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed." });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let stringpassword = password.toString();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not found." });
    }

    if (user.is_deleted) {
      return res.status(403).json({ message: "Account is deleted." });
    }

    const passwordIsValid = bcrypt.compareSync(stringpassword, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    const authorities = user.company_name ? user.company_name : user.first_name + ' ' + user.last_name;

    res.status(200).json({
      id: user._id,
      username: authorities,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed." });
  }
};

// Forgot Password
// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const resetToken = jwt.sign({ email }, config.secret, { expiresIn: '12h' });

    user.reset_password_token = resetToken;
    await user.save();

    const resetLink = `${cors.origin}/reset-password?token=${resetToken}`;

    // Send password reset link to the user's email
    // Example: using the 'sendEmail' function from the 'common/email' module
    await sendEmail({
      email: user.email,
      subject: 'Password Reset',
      text: `Please click on the following link to reset your password: ${resetLink}`,
      resetLink
    });

    return res.status(200).json({ message: 'Password reset link sent to the email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send password reset link.' });
  }
};


// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decodedToken = jwt.verify(token, config.secret);
    const { email } = decodedToken;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.password = bcrypt.hashSync(newPassword, 8);
    user.reset_password_token = null;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Password reset failed.' });
  }
};


// Validate Reset Token
// Validate Reset Token
exports.validateResetToken = async (req, res) => {
  const { token } = req.query;

  try {
    const decodedToken = jwt.verify(token, config.secret);
    const { email } = decodedToken;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ isValid: false, message: 'User not found.' });
    }

    if (user.reset_password_token !== token) {
      return res.status(400).json({ isValid: false, message: 'Reset token is invalid.' });
    }

    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    if (decodedToken.exp < currentTime) {
      return res.status(400).json({ isValid: false, message: 'Reset token has expired.' });
    }

    res.status(200).json({ isValid: true, message: 'Reset token is valid.' });
  } catch (err) {
    res.status(400).json({ isValid: false, message: 'Reset token is invalid.' });
  }
};


// Logout
exports.logout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).json({ message: "You've been signed out!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Logout failed.' });
  }
};
