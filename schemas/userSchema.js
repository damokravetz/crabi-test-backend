const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    email: String,
    password: String,
});

module.exports = userSchema;
