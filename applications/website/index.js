/**
 * @module counterpoint/applications/website
 */

'use strict';

module.exports = [
  ['get', '/', require('./controllers/home')],
  ['get', '/membership', render_membership],
  ['get', '/classes', render_classes],
  ['get', '/donate', render_donate],
  ['get', '/mission', render_mission],
  ['get', '/faq', render_faq],
  ['get', '/contact', render_contact],
  ['get', '/api', render_api],
  ['get', '/legal', render_legal]
];

function render_membership(req, res) {
  res.render('membership');
}

function render_classes(req, res) {
  res.render('classes');
}

function render_donate(req, res) {
  res.render('donate');
}

function render_mission(req, res) {
  res.render('mission');
}

function render_faq(req, res) {
  res.render('faq');
}

function render_contact(req, res) {
  res.render('contact');
}

function render_api(req, res) {
  res.render('api');
}

function render_legal(req, res) {
  res.render('legal');
}
