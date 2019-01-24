require("dotenv").config();
const express = require("express"),
  app = express(),
  path = require("path"),
  mongoose = require("mongoose"),
  record = require("./models/record"),
  nodemailer = require("nodemailer"),
  bodyParser = require("body-parser"),
  PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@ds163764.mlab.com:63764/emailtracker`,
  { useNewUrlParser: true }
);

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/record", (req, res)=> {
    const {from, to, subject} = req.body
    const newRecord = { to, from ,subject};
    record.create(newRecord, (err, doc) => {
      if (err) {
          console.log(err);
      }
      else{
          res.json(doc);
      }
      
    });

})

app.get("/sendMail", (req, res) => {
  async function main() {
    let transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "apikey", // generated ethereal user
        pass: process.env.PASSWORD // generated ethereal password
      }
    });
    let mailOptions = {
      from: '"Ramiro Acosta" <noreply@manuelsavino.com>',
      to: "manuelsavino@gmail.com",
      subject: "Days Off",
      text: "Hello world?",
      html: "<p>Hello, Feel free to take the rest of the week off.</p>"
    }; // sender address // list of receivers // Subject line // plain text body // html body
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);

  res.send("ok");
});

app.get("/track", (req,res)=> {
    record.find({}, (err, resp)=> {
        res.json(resp)
    })
})

app.get("/track/:id", (req, res) => {
  const { id: _id } = req.params;
  console.log(_id)
  record.findByIdAndUpdate({ _id }, {$push: {accessed: {Date: Date.now()} } }, (err, doc)=> {
        if(err)
        {
            console.log(err)
            res.sendFile(path.join(__dirname, "./public", "pix.png"));
        }
        else{   
            res.sendFile(path.join(__dirname, "./public", "pix.png"));
        }
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
