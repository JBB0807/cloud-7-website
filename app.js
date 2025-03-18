"use strict";

const express = require("express");
const fs = require("fs");
const path = require("path");
const leaderboardRouter = require("./routes/leaderboardRouter");
const profileRouter = require("./routes/profileRouter");
const combineHTML = require("./middleware/combineHTML");

const app = express();

const logger = require("morgan");
app.use(logger("dev"));

// Use environment variable if defined, or a fixed value if not.&nbsp;
const PORT = process.env.PORT || 3000;

//use middleware to combine header and footer
app.use(combineHTML);

//use routes of other pages
app.use("/leaderboard", leaderboardRouter);
app.use("/profile", profileRouter);

//for static files
app.use(express.static("public"));

// route for the site root
app.get("/", (req, res) => {
  const body = fs.readFileSync(
    path.join(__dirname, "pages", "index.html"),
    "utf8"
  );

  getPlayerScore("1");

  res.send(res.locals.header + body + res.locals.footer);
});

// start listening
app.listen(PORT, () => {
  console.log(`Hello Express listening on port ${PORT}!`);
});


//
// AWS Functions
//
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();


//AWS function to get the player score from cloud7_leaderboard
//
function getRankings() {
  dynamoDB.scan({ TableName: "cloud7_leaderboard" }, (err, data) => {
    if (err) console.error("Error scanning table:", err);
    else {
      console.log("All items:", data.Items);
      return data.Items;      
    }
  });
}


//AWS function to get the player information from cloud7_player
//
function getPlayerInfo(id) {
  const params = {
    TableName: "cloud7_player",
    KeyConditionExpression: "playerId = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  };

  dynamoDB.query(params, (err, data) => {
    if (err) console.error("Error querying table:", err);
    else {
      console.log("Player info:", data.Items);
      return data.Items;
    }
  });
}


//AWS function to get the player score from cloud7_score
//
function getPlayerScore(id) {
  const params = {
    TableName: "cloud7_score",
    KeyConditionExpression: "playerId = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  };

  dynamoDB.query(params, (err, data) => {
    if (err) console.error("Error querying table:", err);
    else {
      console.log("Player score:", data.Items);
      return data.Items;
    }
  });
}

module.exports = [getRankings, getPlayerInfo, getPlayerScore];
