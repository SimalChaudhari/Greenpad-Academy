const mongoose = require("mongoose");

const DescriptionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Description = mongoose.model("Description", DescriptionSchema);

module.exports = Description;
