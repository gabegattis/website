/**
 * @module counterpoint/applications/website
 */

'use strict';

module.exports = [
  ['get', '/', require('./controllers/home').get_upcoming_events],
  ['get', '/membership', render_membership],
  ['get', '/classes', render_classes],
  ['get', '/donate', require('./controllers/donate').get_client_token],
  ['get', '/mission', render_mission],
  ['get', '/faq', render_faq],
  ['get', '/contact', render_contact],
  ['get', '/legal', render_legal],
  ['post', '/donate', require('./controllers/donate').process_payment]
];

function render_membership(req, res) {
  res.render('membership');
}

function render_classes(req, res) {
  res.render('classes');
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

function render_legal(req, res) {
  res.render('legal');
}
