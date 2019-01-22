const express = require('express'),
      app = express(),
      path = require('path'),
      mongoose = require('mongoose'),
      record = require('./models/record')
app.use('/public', express.static(path.join(__dirname, 'public')))

mongoose.connect(
    process.env.MONGODB_URI || `mongodb://manuel:Miami1111@ds163764.mlab.com:63764/emailtracker`,
  { useNewUrlParser: true }
);

let PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("hello")
})

app.get("/:to/:subject", (req, res)=> {
    const {to, subject} =req.params;
    const newRecord = {to, subject}
    record.create( newRecord, (err, doc)=>{
        if(!err){
        console.log(doc)
        }
    })
    res.sendFile(path.join(__dirname, "./public", "pix.png"));
})


app.listen(PORT, ()=> {
    console.log(`listening on ${PORT}`)
})