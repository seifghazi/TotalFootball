var mongoose = require('mongoose');


var LeagueSchema = new mongoose.Schema ({
  leagueName: String,
  leagueCode: String,
  leaguePicture: String
});



module.exports = mongoose.model("League", League);
