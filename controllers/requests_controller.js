const config = require('../config/config.js');
const request = require('request');
//const url          = 'https://api.football-data.org/v2/teams';

function fetchLeagueData(league) {
  // API call for all teams
  const teams = new Promise((res, rej) => {
    request({
        url: `https://api.football-data.org/v2/competitions/${league}/teams`,
        headers: {
          'X-Auth-Token': config.apiKey
        }
      },
      (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          let teamData = JSON.parse(body);
          res(teamData)
        } else {
          rej();
          throw new Error(err);
        }
      })
  })
  // API call for top scorers
  const scorers = new Promise((res, rej) => {
    request({
        url: `https://api.football-data.org/v2/competitions/${league}/scorers`,
        headers: {
          'X-Auth-Token': config.apiKey
        }
      },
      (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          let scorersData = JSON.parse(body);
          res(scorersData);
        } else {
          rej();
          throw new Error(err);
        }
      })
  })
  // API call for standings
  const standings = new Promise((res, rej) => {
    request({
        url: `https://api.football-data.org/v2/competitions/${league}/standings`,
        headers: {
          'X-Auth-Token': config.apiKey
        }
      },
      (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          let scorersData = JSON.parse(body);
          res(scorersData);
        } else {
          rej();
          throw new Error(err);
        }
      })
  })
  return Promise.all([teams, scorers, standings])
    .then((result) => {
      let leagueObject = {};
      leagueObject.teamList    = result[0];
      leagueObject.scorersList = result[1];
      leagueObject.standings   = result[2];
      return leagueObject;
    })
}

function fetchTeamData(teamID) {
  return new Promise( (res, rej) => {
    request({
        url: `https://api.football-data.org/v2/teams/${teamID}`,
        headers: {
          'X-Auth-Token': config.apiKey
        }
      },
    (err, resp, teamData) => {
      if(!err && resp.statusCode == 200) {
        res(teamData);
      } else {
        rej();
        throw new Error(err);
      }
    })
  })
}

module.exports = {
  fetchLeagueData,
  fetchTeamData
}
