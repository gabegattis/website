'use strict';

(function() {

  var INTERVAL = 1000;
  var who = document.querySelector('#we-are-blank');
  var options = [
    'hackers',
    'artists',
    'makers',
    'teachers',
    'anarchists',
    'friends',
    'philosophers',
    'dreamers',
    'gardeners',
    'engineers',
    'builders',
    'tinkerers',
    'do-it-yourselfers',
    'geeks',
    'punks'
  ];

  setInterval(function() {
    var current = options.indexOf(who.innerHTML);

    if (current === options.length - 1) {
      current = 0;
    } else {
      current = current + 1;
    }

    who.innerHTML = options[current];
  }, INTERVAL);

})();
