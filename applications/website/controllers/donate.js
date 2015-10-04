/**
 * @module website/controllers/donate
 */

'use strict';

var querystring = require('querystring');
var braintree = require('braintree');

// TODO: load this from configuration
var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   'z2ncwzsb8j52zncr',
  publicKey:    '9bx3392m75tk7h4s',
  privateKey:   'b7dcd6d43cf4410eb8eba4419f2fc393'
});

module.exports.process_payment = function(req, res, next) {
  var body = '';

  req.on('data', function(data) {
    body += data.toString();
  });

  req.on('end', function() {
    body = querystring.parse(data);

    gateway.transaction.sale({
      amount: body.amount,
      paymentMethodNonce: body.payment_method_nonce,
    }, function(err, result) {
      if (err) {
        return next(err);
      }

      res.render('donate', {
        paymentResult: result
      });
    });
  });
};

module.exports.get_client_token = function(req, res, next) {
  gateway.clientToken.generate({}, function(err, response) {
    if (err) {
      return next(err);
    }

    res.render('donate', {
      clientToken: response.clientToken
    });
  });
};
