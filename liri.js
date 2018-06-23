// grab the information from the .env file
require("dotenv").config();

// grab the information from keys.js
var keys = require("./keys.js");


// require the needed npm packages
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");

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
    // loop through to have multple words in the song title
        var songName = "";
        //node filename.js spotify-this-song wish on this star
        for (i = 3; i < process.argv.length; i++) {
            songName += process.argv[i] + "+";
        }
        spotifyThis(songName);
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

    client.get("search/tweets", {q: "atim38297792", count: 20} , function (error, tweets, response) {
        if (error){
        console.log(error);
    } else {
        for(var i =0; i <tweets.statuses.length; i++ ) {
            console.log(tweets.statuses[i].text + " on " +tweets.statuses[i].created_at);
        }
    }
        // console.log(tweets);
      
        //   for loop to get through the status lengths and add the created_at
     
    })
}

// spotify function
// function spotifyThis() {
function spotifyThis(query) {
    
    spotify.search({ type: 'track', query: query }, function (err, data) {
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

function makeUrl(answer) {
    return "http://www.omdbapi.com/?t=" + answer + "&y=&plot=short&apikey=trilogy";
}

// OMDB request function - giving a response error
function movieThis(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "Type in your favorite movie",
            name: "movieResponse"
        }
    ]).then(function (movieAnswer){
        console.log(movieAnswer.movieResponse);
    // loop through to have multiple words in the movie title
        for ( i = 3; i < nodeArgs.length; i++) {
            userInput += process.argv[i] + "+";
        }
        request(makeUrl(movieAnswer.movieResponse), function(error, response, body) {
            if(!error && response.statusCode === 200) {
                console.log("-------------------------------");
                console.log(JSON.parse(body).Title);
                console.log("The movie's release year is: " + JSON.parse(body).Year);
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
                console.log("Produced in: " + JSON.parse(body).Country);
                console.log("Movie language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("-------------------------------");
            }
        })
    })
   
}

// do what is says function
function random() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
        }

        var randomChoice = data.split(",");
        console.log(randomChoice);
        if(randomChoice[0] === "spotify-this-song") {
            //"IV LIKEIT"
            spotifyThis(randomChoice[1]);
        }
        
    })
}

