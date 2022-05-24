const { Schema, model } = require('mongoose');

const fileSchema = new Schema({
    name: String,
    type: String,
    containBy: String,
    userHandle: String
}, { timestamps: true })

module.exports = model("File", fileSchema)