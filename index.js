var http = require("http");
//var twitterAPI = require("node-twitterAPI");

var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-type": "text-plain"});
    response.end("Hello world!");
});

/*var twitter = new twitterAPI({
    consumerKey: "A key",
    consumerSecret: "A secret",
    callback: "URL?"
});
*/


//server.listen(9000);
