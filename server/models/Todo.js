const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    name: String,
    list: [Object],
    userHandle: String,
    fileHandle: String
}, { timestamps: true })

module.exports = model('Todo', todoSchema);