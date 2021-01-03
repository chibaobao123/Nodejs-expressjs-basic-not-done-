var express = require('express');
var db = require('../db.js');

module.exports.addToCart = function(req,res,next){
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;
	if(!sessionId){
		res.redirect('/products');
		return;
	}
	var count = db
				.get('session')
				.find({ id: sessionId })
				.get('cart.' + productId,0)
				.value()


	db.get('session')
  	  	.find({ id: sessionId })
  		.set('cart.' + productId,count + 1)
  		.write()
  	
  	
  	res.redirect('products/index')
}