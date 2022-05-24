const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    token: {
        type: String,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);