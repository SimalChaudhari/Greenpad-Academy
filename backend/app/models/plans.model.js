const mongoose = require("mongoose");

// Define the roles using an enum
const rolesEnum = Object.freeze({
  ADMIN: "ADMIN",
  COMPANY: "COMPANY",
  EMPLOYEE: "EMPLOYEE",
});

const Plans = mongoose.model(
  "Plans",
  new mongoose.Schema({
    title: String,
    pdffile: String,
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  })
);

module.exports = Plans;
