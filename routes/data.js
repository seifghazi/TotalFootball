var express     = require('express');
var router      = express.Router();
var requests    = require('../controllers/requests_controller');

router.get('/api', async function(req, res){
  let league = req.query.leagueOption
  if (league) {
    let response = await requests.apiCall(league)
    res.send(response)
  } else {
    res.redirect('/request')
  }
})

router.get("/request", isLoggedIn, function(req, res){
  res.render("request.ejs")
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    console.log('authenticate')
    return next();
  }
  res.redirect('/login');
}
module.exports = router;
