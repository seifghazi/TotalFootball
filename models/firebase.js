const firebase     = require('firebase');
const config       = require('./config/config.js');

//Initialize Firebase
firebase.initializeApp(config.firebaseConfig);


//Reference to database
var database = firebase.database();
