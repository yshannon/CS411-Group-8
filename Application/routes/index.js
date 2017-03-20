var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title : "Search"});
});

/* POST home page. */
router.post('/', function(req, res, next) {
    var searchQuery = req.body.searchbox;

    // make API call

});

module.exports = router;
