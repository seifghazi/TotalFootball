var express     = require('express');
var router      = express.Router();
var requests    = require('../controllers/requests_controller');

router.get('/league', async function(req, res){
  let league = req.query.leagueOption
  if (league) {
    let response =  await requests.apiCall(league)
    res.render('league.ejs', {teams: response.teamList.teams});
  } else {
    res.redirect('/request')
  }
})

router.get('/request', isLoggedIn, function(req, res){
  res.render('request.ejs')
})

router.get('/league/:teamID', async function(req, res) {
  let teamID = req.params.teamID;
  let teamData = await requests.getTeamData(teamID);
  res.send('team data');
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    console.log('authenticate')
    return next();
  }
  res.redirect('/login');
}
module.exports = router;
