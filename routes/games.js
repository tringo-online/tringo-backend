require('dotenv').load();
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('mongodb');
var promise = require('bluebird');
var request = require('request');
var bcrypt = require('bcrypt');
var unirest = require('unirest');
var axios = require("axios");

function Users(){
  return knex('users');
}

function isNotFull() {
  if (this.current_players.length < 10) {
    return this;
  }
}

function getPlayList(requestURL) {
  // Make a request for a user with a given ID
  return axios.get(requestURL)
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      console.log("err ", response);
    });
}

function queryParser(queryParams) {
  return 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + queryParams + '%2C+vevo&type=video&key=' + process.env.apiKEY;
}

/* GET games for dashboard */
router.get('/', function(req, res, next){
  console.log("getting");
  return new Promise(function(res, rej){
    db.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
      var games = db.collection('games');
      games.find({}).next(function(err, data){  //$where: isNotFull()
        res(data);
      })
    })
  }).then(function(games) {
    res.send(games);
  });
});

router.post('/', function(req, res, next){
  getPlayList(queryParser(req.body.query)).then(function(response) {
    res.send(response);
  });
  db.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
    var games = db.collection('games');
    games.insert({
      game_name: req.body.name,
      created_by: req.body.user_name,
      created_date: new Date(),
      current_players: [req.body.user_name],
      player_limit: 10,
      in_progress: true,
      playlist_details: {query:req.body.query}
    });
  });
});

router.delete('/:id', function(req, res, next){
  db.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
    var games = db.collection('games');
    games.remove({game_id:req.params.id}, function(){
      res.send("success");
    })
  })
})

module.exports = router;
