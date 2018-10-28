const express      = require('express');
const app          = express();
const bodyParser   = require('body-parser');
const port         = process.env.PORT || 8000;
const requests     = require('./controllers/requests_controller.js')
const firebase     = require('./models/firebase.js')

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
  res.send("Home Page");
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
