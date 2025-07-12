const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: String,
    stock: Number,
    expiry: Date
});

module.exports = mongoose.model('Medicine', medicineSchema);
