const mongoose = require("mongoose");

// Define the roles using an enum
const rolesEnum = Object.freeze({
  ADMIN: "ADMIN",
  COMPANY: "COMPANY",
  EMPLOYEE: "EMPLOYEE"
});

const ProgrammeContacts = mongoose.model(
  "ProgrammeContacts",
  new mongoose.Schema({
    email: String,
    first_name: String,
    last_name: String,
    mobile: Number,
  })
);

module.exports = ProgrammeContacts;
