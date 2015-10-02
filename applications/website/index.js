/**
 * @module counterpoint/applications/website
 */

'use strict';

module.exports = [
  ['get', '/', render_home]
];

function render_home(req, res) {
  res.render('index');
}
