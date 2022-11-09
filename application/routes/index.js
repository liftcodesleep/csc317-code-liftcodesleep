var express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'CSC 317 App', name: "Jacob Lawrence" });
});
router.get('/registration', function (req, res) {
  res.sendFile(path.join(__dirname + '/registration.html'));
});
router.get("/postimage", function (req, res) {
  res.render('postimage');
});
router.get("posts/:id(//d+)", function (req, res) {
  res.render('viewpost');
});


module.exports = router;