var express = require('express');
var unirest = require('unirest');
var router = express.Router();

require('dotenv').load();


/* API Call */
router.get('/', function(req, res, next) {
  console.log('calling youtube');
  getRequest(req.body.query)
  .then(function(data) {
    res.send(data.body)
  }).catch(function(err){
    res.send(err)
  })
});

function getRequest(query){
  return new Promise(function(resolve,reject){
    unirest.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + query + 'type=video&key=' + youtubeKey)
    .end(function(response){
      resolve(response);
    })
  })
}

module.exports = router;
