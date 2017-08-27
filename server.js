var express = require('express');
var stripe = require('stripe')('sk_test_xkWDPQcIhIPU8NLIEFpo0O9G')
var path = require('path');
var bodyParser = require('body-parser');


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
app.use(bodyParser.json({extended: true}));

app.post('/api/charge', (req, res)=>{
	var token = req.body.token;
	var charge = stripe.charges.create({
		amount: req.body.amount,
		currency: "usd",
		description: "Charge for Loyti",
		source: token
	}, (err, charge)=>{
		if(err){
			console.log('begin error************************')
			console.log(err);
			res.json(false);
		}
		else{
			console.log(charge)
			res.json(true);
		}
	})
})


app.use(bodyParser.json({extended:true}));

// app.use(session(sessionConfig));

var port = 4200;
app.listen(port, function(){
  console.log('listening on port: ', port);
});
