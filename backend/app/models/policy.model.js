const mongoose = require("mongoose");

// Define the roles using an enum
const rolesEnum = Object.freeze({
  ADMIN: "ADMIN",
  COMPANY: "COMPANY",
  EMPLOYEE: "EMPLOYEE"
});

const Policy = mongoose.model(
  "Policy",
  new mongoose.Schema({
    description: String,
  })
);

module.exports = Policy;
