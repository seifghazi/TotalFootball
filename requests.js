const config       = require('./config/config.js');
const url          = 'https://api.football-data.org/v2/competitions/CL/matches';

var options = {
  url: url,
  headers: {
    'X-Auth-Token': config.apiKey
  }
};



module.exports = {
  options: options,

}
