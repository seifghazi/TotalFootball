const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const port          = process.env.PORT || 8000;
const path          = require('path')
const User          = require('./models/users.js');
const mongoose      = require('mongoose')
const passport      = require('passport')
const LocalStrategy = require('passport-local')
const authRoutes    = require('./routes/auth')
const dataRoutes    = require('./routes/data')

// Connect to DB
mongoose.connect('mongodb://localhost/app');

// required for body-parser
app.use(bodyParser.urlencoded({extended: true}));

// use public dir for static files
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

app.use(function(req, res, next){
  res.locals.teams = req.teams;
  res.locals.currentUser = req.user;
  next();
})



// Routes
app.use(authRoutes);
app.use(dataRoutes);

app.listen(port, function(){
  console.log('The magic happens on port: ' + port);
})
