const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let recordSchema = new Schema({
    to: String,
    subject: String,
    date: {
        type: Date,
        default: Date.now
    }
})

let Record = mongoose.model("Record", recordSchema)
module.exports = Record;