var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');


var app = express();

// var sessionConfig = {
//   secret: 'unimagineable secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false,
//     httpOnly: false,
//     maxAge: 36000000
//   }
// };

app.use(express.static(path.join(__dirname + '/document-demo/dist')))

app.use(bodyParser.json({extended:true}));

// app.use(session(sessionConfig));

var port = 4200;
app.listen(port, function(){
  console.log('listening on port: ', port);
});
