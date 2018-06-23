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
var command = process.argv[2];
var userInput = process.argv[3];
var twitterName = {
    screen_name: "atim38297792"
};
var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

console.log("LIRI is ready");
myTweets()

// twitter function
function myTweets() {
    
client.get("statuses/user_timeline", twitterName, function(error, tweets, response){
    if (error);
    return console.log(error);
    console.log(tweets);
    console.log(response);
})
}

// spotify function
spotify.search({ type: 'track', query: 'Wish I knew You' }, function(err, data) {
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

// OMDB request function


