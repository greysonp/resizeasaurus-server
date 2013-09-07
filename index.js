var express = require("express");
var twitter = require("ntwitter");

var app = express();
var twit = new twitter({
    consumer_key: "WK64NFjcPJGCb8lyNovw",
    consumer_secret: "uT70twf20pZc6UqdSkFflB2DWiIY6D9GwvY0pmIk",
    access_token_key: "1739622697-BDhg49NfUVtj09YYaxYns7ibDcWtu9lM6r9HeS2",
    access_token_secret: "uqclKgvdgQ71def4N80tuvi6gX973uCx4zyoFf1wCI"
});


app.use(express.logger());

app.get("/:hash/:url/:message", function(request, response) {

    //console.log("hash_message: " + hash + " site_url: " + url + " extra_message: " + message);

    console.log(request.params);
    console.log(request.params["url"]);
    console.log(request.params["hash"]);
    console.log(request.params["message"]);

    twit.verifyCredentials(function (err, data) {
        console.log(data);
    })
    .updateStatus(request.params["url"] + " " + request.params["message"] + " #" + request.params["hash"],
        function (err, data) {
            console.log(data);
        })
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
      console.log("Listening on " + port);
});
