const express = require('express'),
      app = express(),
      path = require('path')
app.use('/public', express.static(path.join(__dirname, 'public')))

let PORT = process.env.port || 3000;

app.get("/:sender/:subject", (req, res)=> {
    const {sender, subject} =req.params;
    console.log(`${sender} ${subject}`)
    res.sendFile(path.join(__dirname, "./public", "pix.png"));
})


app.listen(PORT, ()=> {
    console.log(`listening on ${PORT}`)
})