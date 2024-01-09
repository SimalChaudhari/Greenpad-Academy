const mongoose = require("mongoose");
const Description = require("./Description.model");

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: false
  },
  descriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Description"
  }], // Array of Description references
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Module = mongoose.model("Module", ModuleSchema);

module.exports = Module;
