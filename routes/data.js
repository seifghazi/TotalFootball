var express     = require('express');
var router      = express.Router();
var fs          = require('fs');
var requests    = require('../controllers/requests_controller');
var charts      = require('../controllers/charts_controller');

//TODO: Abstract routes
router.get('/test', (req, res) => {
  res.send('test');
})

router.get('/league', async function(req, res){
  let league = req.query.leagueOption
  // If route is accessed without selecting league, redirect to league selection page
  if (league) {
    // Fetch League and Scorer data
    let response =  await requests.apiCall(league)
    // Setup chart for league top scorers
    let chartData = await charts.scorersChartSetup(response.scorersList.scorers)
    res.render('league.ejs', {teams: response.teamList.teams, chartData: chartData, league: response.teamList, standings: response.standings});
  } else {
    res.redirect('/request')
  }
})

router.get('/home', (req, res) => {
  res.send('Home');
})

router.get('/navbar', (req, res) => {
  res.render('navbar.ejs', {currentUser: req.user});
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
