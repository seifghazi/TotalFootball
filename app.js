const express      = require('express');
const app          = express();
const bodyParser   = require('body-parser');
const port         = process.env.PORT || 8000;
const path         = require('path')

//required for body-parser
app.use(bodyParser.urlencoded({extended: true}));

//use public dir for static files
app.use(express.static(__dirname + '/public'))


app.get('/', function(req, res){
  res.render('login.ejs');
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
