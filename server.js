require("dotenv").config();
const express = require('express'),
      app = express(),
      path = require('path'),
      mongoose = require('mongoose'),
      record = require('./models/record'),
      nodemailer = require('nodemailer'),
      bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')))

mongoose.connect(
    process.env.MONGODB_URI || `mongodb://manuel:Miami1111@ds163764.mlab.com:63764/emailtracker`,
  { useNewUrlParser: true }
);

let PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("hello")
})

app.get("/sendMail", (req, res)=>{

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
    let mailOptions = { from: '"Ramiro Acosta" <noreply@manuelsavino.com>', to: "manuelsavino@gmail.com", subject: "Days Off", text: "Hello world?", html: "<p>Hello, Feel free to take the rest of the week off.</p>" }; // sender address // list of receivers // Subject line // plain text body // html body
    let info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId);
    } 

    main().catch(console.error);

    res.send("ok")
});

app.post("/email", (req, res) => {
    const {name, email, subject, message} = req.body;

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
        let mailOptions = { from: '"Form Submission Bot" <noreply@manuelsavino.com>', 
        to: "manuelsavino@gmail.com", 
        subject: "New Form Submission", 
        text: "Form Submission", 
        html: `
        From: ${name} <br />
        Email: ${email} <br />
        Subject: ${subject} <br />
        
        Message: <p>${message}</p>` }; 
        let info = await transporter.sendMail(mailOptions)
        console.log("Message sent: %s", info.messageId);
    }

    main().catch(console.error);

    res.send("ok")
});

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