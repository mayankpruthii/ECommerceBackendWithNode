const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
// it will create a timestamp when a data entry is created
}, {timestamps: true});

module.exports = mongoose.model("Category", categorySchema);

