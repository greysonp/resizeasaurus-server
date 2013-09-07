var express = require("express");
var twitterAPI = require("node-twitter-api");

var app = express();
/*var twitter = new twitterAPI({
    consumerKey: "WK64NFjcPJGCb8lyNovw",
    consumerSecret: "uT70twf20pZc6UqdSkFflB2DWiIY6D9GwvY0pmIk",
    callback: "http://glacial-reef-2380.herokuapp.com/"
    });
*/

app.use(express.logger());

app.get('/', function(request, response) {
      response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
      console.log("Listening on " + port);
});
