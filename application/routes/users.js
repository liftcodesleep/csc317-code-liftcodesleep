var express = require('express');
var router = express.Router();
const db = require('../conf/database');
const bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post("/register", function (req, res, next) {
  console.log(req.body);
  // res.send();
  const { username, email, password } = req.body;
  db.query('select userId from user where username=?', [username])
    .then(function ([results, fields]) {
      if (results && results.length == 0) {
        return db.query('select email from user where email=?', [email])
      }
      else {
        throw new Error('Username already exists')
      }
    }).then(function ([results, fields]) {
      if (results && results.length == 0) {
        return bcrypt.hash(password, 2);
      }
      else {
        throw new Error('Email already exists')
      }
    }).then(function (hashedPassword) {
      return db.execute('insert into user (username, email, password) value (?,?,?)', [username, email, hashedPassword])
    }).then(function ([results, fields]) {
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
  const { username, password } = req.body;

  let loggedUserId;
  let loggedUsername;

  db.query('select userId, username, password from user where username=?', [username])
    .then(function ([results, fields]) {
      if (results && results.length == 1) {
        loggedUserId = results[0].userId;
        loggedUsername = results[0].username;
        let dbPassword = results[0].password;
        return bcrypt.compare(password, dbPassword);
      } else {
        throw new UserError('Failed login: Invalid user credentials', "/login", 200);
      }
    }).then(function (passwordsMatched) {
      if (passwordsMatched) {
        req.session.userId = loggedUserId;
        req.session.username = loggedUsername;
        req.flash("success", `Hi ${loggedUsername}, you are now logged in.`);
        req.session.save(function (saveErr) {
          res.redirect('/');
        })
      } else {
        throw new UserError('Failed login: Invalid user credentials', "/login", 200);
      }
    }).catch(function (err) {
      if (err instanceof UserError) {
        req.flash("error", err.getMessage());
        req.session.save(function (saveErr) {
          res.redirect(err.getRedirectURL());
        })
      } else {
        next(err);
      }
    })
});
router.post("/logout", function (req, res, next) {
  req.session.destroy(function (destroyError) {
    if (destroyError) {
      next(err);
    } else {
      res.json({
        status: 200, message: "You logged out"
      });
    }
  });
});

router.delete('/login')
module.exports = router;
