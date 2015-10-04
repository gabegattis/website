/**
 * @module website/controllers/donate
 */

'use strict';

var config = require('../../../config').braintree
var querystring = require('querystring');
var braintree = require('braintree');

// TODO: load this from configuration
var gateway = braintree.connect({
  environment:  braintree.Environment[config.env],
  merchantId: config.merchant,
  publicKey: config.pubkey,
  privateKey: config.privkey
});

module.exports.process_payment = function(req, res, next) {
  var body = '';

  req.on('data', function(data) {
    body += data.toString();
  });

  req.on('end', function() {
    body = querystring.parse(body);

    gateway.transaction.sale({
      amount: body.amount,
      paymentMethodNonce: body.payment_method_nonce,
    }, function(err, result) {
      if (err) {
        return next(err);
      }

      if (result.success !== true) {
        return next(new Error(result.message));
      }

      console.log(result)

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
