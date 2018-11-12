var express     = require('express');
var router      = express.Router();
var passport    = require('passport');

const User      = require('../models/users.js');


//===================
// AUTH ROUTES
//===================
router.get('/', function(req, res){
  console.log(req.user)
  res.render('home.ejs')
})

router.get('/register', function(req, res){
  res.render('register.ejs');
})

router.post('/register', function(req, res){
  console.log(req.body)
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render('register.ejs')
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/');
    });
  });
})

router.get('/login', function(req, res) {
  res.render('login.ejs');
})

router.post('/login', passport.authenticate('local',{ successRedirect: '/', failureRedirect: '/login'}))

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    console.log('authenticate')
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
