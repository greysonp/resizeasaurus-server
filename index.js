var request = require("request");
var express = require("express");
var twitter = require("ntwitter");

var gif_response = "";
var app = express();
var twit = new twitter({
    consumer_key: "WK64NFjcPJGCb8lyNovw",
    consumer_secret: "uT70twf20pZc6UqdSkFflB2DWiIY6D9GwvY0pmIk",
    access_token_key: "1739622697-BDhg49NfUVtj09YYaxYns7ibDcWtu9lM6r9HeS2",
    access_token_secret: "uqclKgvdgQ71def4N80tuvi6gX973uCx4zyoFf1wCI"
});


app.use(express.logger());

app.get("/:hash/:url/:message/:gif_type", function(req, response) {

    // check to see if message should be used
    if (req.params["message"] == "none") {
        req.params["message"] = "";
    }

    console.log(req.params["gif_type"]);

    // if gif_type specified, query giphy api using the gif type as a search term
    // choose one at randome and embed the url in the tweet
    request("http://api.giphy.com/v1/gifs/search?q=" + req.params["gif_type"] + "&limit=100&api_key=dc6zaTOxFJmzC", function(error, response, body) {
        if (error) {
            console.log("failed to query api");
        }
        else {
            var json_thing = JSON.parse(body);

            var random_factor = Math.floor(Math.random() * json_thing.data.length - 1);
            var gif =""

            if(typeof json_thing != 'undefined' || json_thing.data != null || json_thing.data.length != 0) {
                gif = json_thing.data[random_factor].images.original.url;
            }
            else if (req.params["hash"].toLowerCase() === "wreck") {
                gif = "http://media0.giphy.com/media/kzqqeazk910C4/original.gif";
            }
            else if (req.params["hash"].toLowerCase() === "respect") {
                gif = "http://media0.giphy.com/media/XMvrleT9jksXm/original.gif";
            }
            else {
                gif = "http://media1.giphy.com/media/4gi5nU2Yz5jvG/giphy.gif";
            }
            twit.verifyCredentials(function (err, data) {
                console.log(data);
            })
            .updateStatus( " #" + req.params["hash"] + " | " + req.params["url"] + " " + req.params["message"] + " |  " + gif,
                function (err, data) {
                    console.log(data);
            })
        }
    })
});

app.get("/:hash/:url/:message", function (req, response) {
    console.log("wut");

    twit.verifyCredentials(function (err, data) {
        console.log(data);
    })
    .updateStatus(" #" + req.params["hash"] + " |  " + req.params["url"] + " " + req.params["message"],
        function (err, data) {
            console.log(data);
        })
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
      console.log("Listening on " + port);
});
