var express     = require('express');
var router      = express.Router();
var passport    = require('passport');
const User      = require('../models/users.js');


//===================
// AUTH ROUTES
//===================
router.get('/', function(req, res){
  res.render('landing.ejs')
})

router.get('/register', function(req, res){
  res.render('register.ejs');
})

router.post('/register', function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect('register')
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/request');
    });
  });
})

router.get('/login', function(req, res) {
  res.render('login.ejs');
})

router.post('/login', passport.authenticate('local',{ successRedirect: '/request', failureRedirect: '/login'}))

router.get('/logout', function(req, res){
  req.logout();
  req.flash("success", "Successfully logged out")
  res.redirect('/login');
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
