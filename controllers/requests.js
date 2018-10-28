const config       = require('../config/config.js');
const request      = require('request')
//const url          = 'https://api.football-data.org/v2/teams';


// let options = {
//   url: url,
//   headers: {
//     'X-Auth-Token': config.apiKey
//   }
// };

function apiCall() {
  return new Promise((res, rej) => {
    request({url: 'https://api.football-data.org/v2/competitions/'+ 'PD', headers:{'X-Auth-Token': config.apiKey}}, function(err, resp, body){
      if(!err && resp.statusCode == 200) {
        let parsedData = JSON.parse(body);
        // console.log(parsedData)
        res(parsedData)
        //firebase.saveData(parsedData);
      } else {
        rej()
        throw new Error(err)
      }
    })
})

}


module.exports = {
  //   options: options,
  apiCall: apiCall
}
