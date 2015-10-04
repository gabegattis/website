'use strict';

(function() {

  var clientToken = document.querySelector('#card-donation').getAttribute('data-token');

  braintree.setup(clientToken, 'custom', {
    id: 'card-donation',
    hostedFields: {
      number: {
        selector: '#card-number',
        placeholder: 'XXXX XXXX XXXX XXXX'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#expiration',
        placeholder: 'MM/YY'
      },
      styles: {
        'input': {
          'font-size': '16px'
        }
      }
    }
  });

})();
