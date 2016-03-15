require('dotenv').load();
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('mongodb');
var promise = require('bluebird');
var request = require('request');
var bcrypt = require('bcrypt');
var unirest = require('unirest');

function Users(){
  return knex('users');
}

function isNotFull() {
  if (this.players < 10) {
    return this;
  }
}

/* GET games for dashboard */
router.get('/', function(req, res, next){
  return new Promise(function(res, rej){
    db.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
    var games = db.collection('games');
    games.find({$where: isNotFull()}).next(function(err, data){
      res(data)
    })
  }).then(function(games) {
    res.send(games);
  })
})

router.post('/', function(req, res, next){
  db.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
    var games = db.collection('games');
    games.insert({
      // game data goes here
    }, function(){
      res.send("success");
    })
  });
});

router.delete('/:id', function(req, res, next){
  db.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
    var games = db.collection('games');
    games.remove({game_id:req.params.id}, function(){
      res.send("success");
    })
  });
})

module.exports = router;
