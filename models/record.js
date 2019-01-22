const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let recordSchema = new Schema({
    to: String,
    subject: String
})

let Record = mongoose.model("Record", recordSchema)
module.exports = Record;