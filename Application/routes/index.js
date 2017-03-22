var express = require('express');
var router = express.Router();
var request = require('request');
var oauthSignature = require('oauth-signature');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title : "Search"});
});

/* POST home page. */
router.post('/', function(req, res, next) {
    var searchQuery = req.body.searchbox;
    var secrets = require("../config/yelp_api.json");

    var parameters = { oauth_consumer_key: secrets.oauth_consumer_key,
        oauth_token: secrets.oauth_token,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: new Date().getTime(),
        oauth_nonce: secrets.oauth_token,
        oauth_version: '1.0',
        term: searchQuery,
        location: 'Boston' };

    var sig = {oauth_signature: oauthSignature.generate("GET", "https://api.yelp.com/v2/search", parameters, secrets.oauth_customer_secret, secrets.oauth_token_secret)};

    var options = { method: 'GET',
        url: 'https://api.yelp.com/v2/search',
        qs:
            Object.assign(sig, parameters),
        headers:
            { 'postman-token': 'c177e999-6c14-5cf7-4742-26f728c42038',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var jsonData=JSON.parse(body);
        var string="";
        for (var i=0; i<jsonData.businesses.length; i++ ){
            var restaurant =jsonData.businesses[i];
            string+=restaurant.name;
            string += ", ";
            console.log(string);
        }
        res.send(string)

    });

});

module.exports = router;
