import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
// import { DocumentRef } from './document-ref';
declare var document: any;
declare var Stripe: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  self = this;
  charge = {
  	amount: 100
  };
  submitted = {
  	submit: false
  }
  // constructor(private _docRef: DocumentRef){
  constructor(private _http:HttpService){

  }
  onSubmit(){
  	console.log("you submitted the form");
  }
  ngAfterViewInit(){
  	console.log(Stripe);
  	var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	var elements = stripe.elements();

	var card = elements.create('card', {
	  hidePostalCode: true,
	  style: {
	    base: {
	      iconColor: '#F99A52',
	      color: '#32315E',
	      lineHeight: '48px',
	      fontWeight: 400,
	      fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
	      fontSize: '15px',

	      '::placeholder': {
	        color: '#CFD7DF',
	      }
	    },
	  }
	});
	card.mount('#card-element');

	function setOutcome(result) {
	  var successElement = document.querySelector('.success');
	  var errorElement = document.querySelector('.error');
	  successElement.classList.remove('visible');
	  errorElement.classList.remove('visible');

	  if (result.token) {
	    // Use the token to create a charge or a customer
	    // https://stripe.com/docs/charges
	    // successElement.querySelector('.token').textContent = result.token.id;
	    // successElement.classList.add('visible');
	    self._http.createCharge(result.token, self.charge.amount)
	    .then((res)=>{
	    	console.log('opening');
	    	self.submitted.submit = true;
	    	setTimeout(self.open, 1500);
	    })
	    .catch();
	  } else if (result.error) {
	    errorElement.textContent = result.error.message;
	    errorElement.classList.add('visible');
	  }
	}

	card.on('change', function(event) {
	  setOutcome(event);
	});
	console.log(card);
	var self = this;
	document.querySelector('form').addEventListener('submit', function(e) {
	  e.preventDefault();
	  // var form = self._docRef.nativeDocument.querySelector('form');
	  var form = document.querySelector('form');

	  var extraDetails = {
	    name: form.querySelector('input[name=cardholder-name]').value,
	    address_zip: form.querySelector('input[name=address-zip]').value
	  };
	  stripe.createToken(card, extraDetails).then((event)=>{
	  	console.log(event);
	  	if(!event.error){
		  	console.log("you passed payment validation");
		    self.bite();
	  	}
	  	setOutcome(event);
	  });
	});
  }
  ngOnInit(){
 //  	console.log(Stripe);
 //  	var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	// var elements = stripe.elements();

	// var card = elements.create('card', {
	//   hidePostalCode: true,
	//   style: {
	//     base: {
	//       iconColor: '#F99A52',
	//       color: '#32315E',
	//       lineHeight: '48px',
	//       fontWeight: 400,
	//       fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
	//       fontSize: '15px',

	//       '::placeholder': {
	//         color: '#CFD7DF',
	//       }
	//     },
	//   }
	// });
	// self.ngAfterContentInit();
	// card.mount('#card-element');

	// function setOutcome(result) {
	//   var successElement = document.querySelector('.success');
	//   var errorElement = document.querySelector('.error');
	//   successElement.classList.remove('visible');
	//   errorElement.classList.remove('visible');

	//   if (result.token) {
	//     // Use the token to create a charge or a customer
	//     // https://stripe.com/docs/charges
	//     // successElement.querySelector('.token').textContent = result.token.id;
	//     // successElement.classList.add('visible');
	//     self._http.createCharge(result.token, self.charge.amount)
	//     .then()
	//     .catch();
	//   } else if (result.error) {
	//     errorElement.textContent = result.error.message;
	//     errorElement.classList.add('visible');
	//   }
	// }

	// card.on('change', function(event) {
	//   setOutcome(event);
	// });
	// console.log(card);
	// var self = this;
	// document.querySelector('form').addEventListener('submit', function(e) {
	//   e.preventDefault();
	//   // var form = self._docRef.nativeDocument.querySelector('form');
	//   var form = document.querySelector('form');

	//   var extraDetails = {
	//     name: form.querySelector('input[name=cardholder-name]').value,
	//     address_zip: form.querySelector('input[name=address-zip]').value
	//   };
	//   stripe.createToken(card, extraDetails).then((event)=>{
	//   	console.log(event);
	//   	if(!event.error){
	// 	  	console.log("you passed payment validation");
	// 	    self.bite();
	//   	}
	//   	setOutcome(event);
	//   });
	// });
  }

  bite(){
  	var top = document.querySelector('#top');
  	var bottom = document.querySelector('#bottom');
  	top.className = 'top';
  	bottom.className = 'bottom';
  }

  open(){
  	var top = document.querySelector('#top');
  	var bottom = document.querySelector('#bottom');
  	top.style.top = '-50%';
  	top.style.animationName = 'topR';
  	bottom.style.top = '150%'
  	bottom.style.animationName = 'bottomR';
  }
 }

