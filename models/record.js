const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let recordSchema = new Schema({
  to: String,
  from: String,
  subject: String,
  date: {
    type: Date,
    default: Date.now
  },
  accessed: [
      {
        date: Date
      }
    ]
});

let Record = mongoose.model("Record", recordSchema)
module.exports = Record;