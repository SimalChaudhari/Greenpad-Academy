const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");
const initializeDatabase = require("../config/db.init");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbConfig.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    initializeDatabase();
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
};

connectToDatabase();

const db = {
  mongoose,
  User: require("./user.model"),
  Course: require("./course.model"),
  Note: require("./note.model"),
  Module: require("./Module.model"),
  Description: require("./Description.model"),
  Policy: require("./policy.model"),
  ProgrammeContacts: require("./programmecontacts.model"),
  Contactus: require("./contactus.model"),
  Exam: require("./exam.model"),
  Setting: require("./settings.model"),
  Plans: require("./plans.model")
};

module.exports = db;
