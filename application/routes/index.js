var express = require('express');
const { isLoggedIn } = require('../middleware/protectors');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'CSC 317 App', name: "Jacob Lawrence" });
});
router.get("/login", function (req, res) {
  res.render('login');
})
router.get("/register", function (req, res) {
  res.render('register');
});
router.get("/postimage", isLoggedIn, function (req, res) {
  res.render('postimage');
});
router.get("/posts/:id(\\d+)", function (req, res) {
  res.render('viewpost', { js: ["viewpost.js"] });
});
router.get("/viewpost", function (req, res) {
  res.render('viewpost');
});
router.get("/logout", function (req, res) {
  res.render('login');
})

module.exports = router;