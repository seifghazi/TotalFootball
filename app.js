const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const port          = process.env.PORT || 8000;
const path          = require('path')
const mongoose      = require('mongoose')
const passport      = require('passport')
const LocalStrategy = require('passport-local')
const  User         = require('./models/users.js');


mongoose.connect('mongodb://localhost/app');


//required for body-parser
app.use(bodyParser.urlencoded({extended: true}));

//use public dir for static files
app.use(express.static(__dirname + '/public'))

// Passport Config
app.use(require('express-session')({
  secret: "First time setting up auth using passport",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());  
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res){
  console.log(req.user)
  res.render('home.ejs')
})

//===================
// AUTH ROUTES
//===================

app.get('/register', function(req, res){
  res.render('register.ejs');
})

app.post('/register', function(req, res){
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

app.get('/login', function(req, res) {
  res.render('login.ejs');
})

app.post('/login', passport.authenticate('local',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        }), function(req, res){
})

app.get('logout', function(req, res){
  req.logout();
  res.redirect('/login');
})
// app.post('/api', function(req, res){
//   let league = req.body.leagueOption
//
//   console.log(league)
//   res.send(requests.apiCall(league))
// })

app.get('/api', async function(req, res){
  let league = req.query.leagueOption
  if (league) {
    let response = await requests.apiCall(league)
    res.send(response)
  } else {
    res.redirect('/request')
  }
})

app.get("/request", isLoggedIn, function(req, res){
  res.render("request.ejs")
})

function isLoggedIn(req, res, next){
  console.log(req.user)
  if(req.isAuthenticated()) {
    console.log('authenticate')
    return next();
  }
  console.log('failed to authenticate');
  res.redirect('/login');
}

app.listen(port, function(){
  console.log('The magic happens on port: ' + port);
})
