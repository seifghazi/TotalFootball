const express      = require('express');
const app          = express();
const request      = require('request');
const bodyParser   = require('body-parser');
const port         = process.env.PORT || 8000;
const requests     = require('./requests.js')

app.get('/', function(req, res){
  res.send('HOME PAGE');
})

app.get('/api', function(req, res){
  request(requests.options, function(err, resp, body){
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
