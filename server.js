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
  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: process.env.EMAIL,
            },
          ],
          subject: req.body.subject,
        },
      ],
      from: {
        email: req.body.email,
      },
      content: [
        {
          type: 'text/plain',
          value: req.body.fname + ' ' + req.body.lname + '(' + req.body.email + ') says: ' + req.body.message,
        },
      ],
    },
  });

  //With callback
  sg.API(request, function(error, response) {
    if (error) {
      console.log('Error response received');
    }
  });
res.redirect("/" );
});

// POST route from contact form
app.post('/subscribe', function (req, res) {
  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: process.env.EMAIL,
            },
          ],
          subject: 'Subscription Request',
        },
      ],
      from: {
        email: req.body.email,
      },
      content: [
        {
          type: 'text/plain',
          value: req.body.email + ' wants to be subscribed to the newsletter.',
        },
      ],
    },
  });

  //With callback
  sg.API(request, function(error, response) {
    if (error) {
      console.log('Error response received');
    }
  });
  res.redirect("/" );
});


const PORT = process.env.PORT
var server = app.listen(PORT || 8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Listening at http://%s:%s", host, port)

})