var express = require('express');
var router = express.Router();
const db = require('../conf/database');
const bcrypt = require('bcrypt');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post("/register", function (req, res, next) {
  console.log(req.body);
  // res.send();
  const { uname, email, psw } = req.body;
  db.query('select id from user where name=?', [uname])
    .then(function ([results, fields]) {
      if (results && results.length == 0) {
        return db.query('select email from user where email=?', [email])
      }
      else {
        throw new Error('Username already exists')
      }
    }).then(function ([results, fields]) {
      if (results && results.length == 0) {
        return bcrypt.hash(psw, 2);
      }
      else {
        throw new Error('Email already exists')
      }
      // res.json(results);
    }).then(function (hashedPassword) {
      return db.execute('insert into user (name, email, password) value (?,?,?)', [uname, email, hashedPassword])

    })


    .then(function ([results, fields]) {
      if (results && results.affectedRows) {
        res.redirect('/login');
      }
      else {
        throw new Error('User could not be made');
      }
    })

    .catch(function (err) {
      // res.redirect('/register');
      next(err);
    })
});
router.post("/login", function (req, res, next) {
  const { uname, psw } = req.body;

  db.query('select id, name, email from user where name=? AND password=?', [uname, psw])
    .then(function ([results, fields]) {
      if (results && results.length == 1) {
        res.redirect('/');
      } else {
        throw new Error('Invalid user credentials');
      }
    }).catch(function (err) {
      next(err);
    })
});

router.delete('/login')
module.exports = router;
