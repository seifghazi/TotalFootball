const express      = require('express');
const app          = express();
const request      = require('request');
const bodyParser   = require('body-parser');
const port         = process.env.PORT || 8000;
const apiKey       = '9bdeeda8c6504d4d9b19c3d12e81c4fe';
const url          = 'https://api.football-data.org/v2/competitions/CL/matches';


var options = {
  url: url,
  headers: {
    'X': apiKey
  }
};



app.get('/', function(req, res){
  request(options, function(err, resp, body){
    if(!err && resp.statusCode == 200) {
            var parsedData = JSON.parse(body);
            res.send(parsedData);
            console.log(parsedData);
        }
  })
})



app.listen(port, function(){
  console.log('The magic happens on port: ' + port);
})
