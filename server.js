var Twit = require('twit')
const url = require('url');
const http = require('http');
var req = require('request');

var T = new Twit({
  consumer_key:         'BEXhqTckFvyOtXhJmeJNIN9O2',
  consumer_secret:      'iWjczPSD9L8DnbZ9efzlPgDZuJtsZkJV6vmr3ENNTPaiyXqDYY',
  access_token:         '4517086245-9v5U2JrNoaoFu2zHxHx8JDPgmBLxE6klAgfQOfU',
  access_token_secret:  'KvaQO4OQaw8rLc2TgXzUmQQ3oAien6A5L2MlJw4W3wb4v',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
function createServer(){
  const app = http.createServer(function(request, response) {
    var city, query,texts;
    query = url.parse(request.url, true).query;
    console.log(request.headers);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
    response.writeHead(200, {"Access-Control-Allow-Credentials": "true"});
		response.writeHead(200, {"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"});
		response.writeHead(200, {"Access-Control-Allow-Headers": "Content-Type"});
    if(query.tweets){
      console.log("TWEETS");
      texts = getTweets(query.tweets);
      texts.then(function(result){
        //console.log(JSON.stringify(result));
        response.write(JSON.stringify(result));
        response.end();
      },function(err){
        console.log(err);
      });
    }else if(query.topStreams){
      console.log("TOP STREAMS");
      texts = getTopStreams();
      texts.then(function(result){
        //console.log(JSON.stringify(result));
        response.write(JSON.stringify(result));
        response.end();
      },function(err){
        console.log(err);
      });
    }

  });
  app.listen(3000);
}

function getTweets(recherche){
  return new Promise(function(resolve, reject) {
      var res = [];
      console.log(recherche);
      T.get('search/tweets', { q: recherche+' since:2011-07-11', count: 100 }, function(err, data, response) {
        data = JSON.parse(JSON.stringify(data));
        //console.log(data.statuses);
        data.statuses.forEach(function(elt){
          //console.log(elt.text);
          res.push(elt);
        });
        resolve(res);
      });
  });
}

function getTopStreams(){
    return new Promise(function(resolve, reject) {
     // Do async job
       var options = {
           url: 'https://api.twitch.tv/kraken/games/top',
           headers: {
               "Client-ID":"hdiebqr67mptvyg1v6ayhbry1njc5q"
           }
       };
       // Return new promise
        req.get(options, function(err, resp, body) {
            console.log(body);
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    });
}

createServer();
