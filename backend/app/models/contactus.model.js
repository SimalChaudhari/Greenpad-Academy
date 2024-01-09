const mongoose = require("mongoose");

// Define the roles using an enum
const rolesEnum = Object.freeze({
  ADMIN: "ADMIN",
  COMPANY: "COMPANY",
  EMPLOYEE: "EMPLOYEE"
});

const Contactus = mongoose.model(
  "Contactus",
  new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    query: String,
    type: String,
  })
);

module.exports = Contactus;
