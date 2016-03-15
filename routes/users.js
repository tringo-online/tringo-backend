var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


/* GET user listing. */
router.get('/:id', function(req, res, next) {
  knex('users').where({email: req.user.email}).then(function(users){
    res.send(users);
  }).catch(function(err){
    throw err;
  })
});

module.exports = router;
