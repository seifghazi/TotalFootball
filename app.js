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
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res){
  res.send('HOME')
})

//===================
// AUTH ROUTES
//===================

app.get('/register', function(req, res){
  res.render('register.ejs');
})

app.post('/register', function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if(err) {
      console.log(err);
      return res.render('register.ejs')
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/request');
    });
  });

})
// app.post('/api', function(req, res){
//   let league = req.body.leagueOption
//
//   console.log(league)
//   res.send(requests.apiCall(league))
// })

app.get('/api', async (req, res) => {
  let league = req.query.leagueOption
  if (league) {
    let response = await requests.apiCall(league)
    res.send(response)
  } else {
    res.redirect('/request')
  }
})

app.get("/request", function(req, res){
  res.render("request.ejs")
})

app.listen(port, function(){
  console.log('The magic happens on port: ' + port);
})
