var express = require('express');
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
router.get("/postimage", function (req, res) {
  res.render('postimage');
});
router.get("/viewpost", function (req, res) {
  res.render('viewpost');
});


module.exports = router;