// grab the information from the .env file
require("dotenv").config();

// grab the information from keys.js
var keys = require("./keys.js");
console.log("hello");

// require the needed npm packages
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

// create variables to use
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var nodeArgs = process.argv
var command = process.argv[2];
var userInput = "";
var twitterName = {
    screen_name: "atim38297792"
};
var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

console.log("LIRI is ready");

// create switch statements for the commands for the user to choose from
switch (command) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        random();
        break;
    default:
        "Choose a command: my-tweets, spotify-this-song, movie-this, or do-what-it-say"

}


// twitter function - resulting in null :(
function myTweets() {

    client.get("statuses/user_timeline", twitterName, function (error, tweets, response) {
        if (error);
        return console.log(error);
        console.log(tweets);
        console.log(response);
    })
}

// spotify function
function spotifyThis() {
    // loop through to have multple words in the song title
    for (i = 3; i < nodeArgs.length; i++) {
        userInput += process.argv[i] + "+";
    }
    spotify.search({ type: 'track', query: userInput }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("--------------------")
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("--------------------")

    });

}

// OMDB request function - giving a response error
function movieThis(){
    // loop through to have multiple words in the movie title
    for ( i = 3; i < nodeArgs.length; i++) {
        userInput += process.argv[i] + "+";
    }
    request(queryUrl, function(error, response, body) {
        if(!error && response.statusCode === 200) {
            console.log(body);
            console.log("The movie's release year is: " + JSON.parse(body).Year);
        }
    })
}



