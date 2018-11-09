const firebaseSetup = require('firebase');
const config        = require('../config/config.js');

//Initialize Firebase
const firebase = firebaseSetup.initializeApp(config.firebaseConfig);

// //Reference to database
// var database = firebase.database();
//
// //Reference to Teams
// var teams = database.ref().child('Teams');
//
// function saveData(league) {
//   teams.set({league});
// }

module.exports = {
  // saveData: saveData,
  firebase: firebase
};







  // //Team Reference
  // var dbTeam = firebase.database().ref().child('Team');
  //
  // dbTeam.on('value', function(temp) {
  //   console.log(temp.val());
  // })
