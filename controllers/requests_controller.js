const config = require('../config/config.js');
const request = require('request');
//const url          = 'https://api.football-data.org/v2/teams';

function apiCall(league) {
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

function getTeamData(teamID) {
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

function topScorers() {
  // API call for all teams
  const scorersPD = new Promise((res, rej) => {
    request({
        url: `https://api.football-data.org/v2/competitions/PD/scorers?filter=150`,
        headers: {
          'X-Auth-Token': config.apiKey
        }
      },
      (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          let scorersLaLiga = JSON.parse(body);
          res(teamData)
        } else {
          rej();
          throw new Error(err);
        }
      })
  })
  // API call for top scorers
  const scorersPL = new Promise((res, rej) => {
    request({
      url: `https://api.football-data.org/v2/competitions/PL/scorers?filter=150`,
        headers: {
          'X-Auth-Token': config.apiKey
        }
      },
      (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          let scorersEPL = JSON.parse(body);
          res(scorersData);
        } else {
          rej();
          throw new Error(err);
        }
      })
  })
  // API call for standings
  const scorersSA = new Promise((res, rej) => {
    request({
        url: `https://api.football-data.org/v2/competitions/SA/scorers?filter=150`,
        headers: {
          'X-Auth-Token': config.apiKey
        }
      },
      (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          let scorersSerieA = JSON.parse(body);
          res(scorersData);
        } else {
          rej();
          throw new Error(err);
        }
      })
  })
  const scorerObject = Promise.all([scorersPD, scorersPL, scorersSA])
    .then((result) => {
      let scorerObject = {};
      scorerObject.scorersPD    = result[0];
      scorerObject.scorersPL    = result[1];
      scorerObject.scorersSA    = result[2];
      return scorerObject;
    })
}

module.exports = {
  apiCall,
  getTeamData,
  topScorers
}
