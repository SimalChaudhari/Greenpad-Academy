const mongoose = require("mongoose");

// Define the roles using an enum
const rolesEnum = Object.freeze({
  ADMIN: "ADMIN",
  COMPANY: "COMPANY",
  EMPLOYEE: "EMPLOYEE",
});

const Settings = mongoose.model(
  "Settings",
  new mongoose.Schema({
    email: String,
    mobile_numbe: String,
    address: String,
  })
);

module.exports = Settings;
