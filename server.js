var express = require('express');
var stripe = require('stripe')('sk_test_ilUXe066lcE65HDBSfOkwKbQ')
var path = require('path');
var bodyParser = require('body-parser');


var app = express();

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


app.listen(4200);