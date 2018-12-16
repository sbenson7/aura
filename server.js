var express = require('express');
var app = express();

var fs = require("fs");

require('dotenv').load();

var bodyParser = require('body-parser');
var multer  = require('multer');
const nodemailer = require('nodemailer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
express.json()

 
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

// POST route from contact form
app.post('/contactForm', function (req, res) {
  let mailOpts, smtpTrans;
  console.log(req.body.subject)
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
       user: process.env.EMAIL,
       pass: process.env.PASSWORD
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: process.env.EMAIL,
    subject: req.body.subject,
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      console.log(error)
      res.redirect("/" );
    }
    else {
      res.redirect("/" );
    }
  });
});


const PORT = process.env.PORT
var server = app.listen(PORT || 8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Listening at http://%s:%s", host, port)

})