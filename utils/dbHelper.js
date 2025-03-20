//
// AWS Functions
//
const AWS = require("aws-sdk");
const e = require("express");
AWS.config.update({ region: "us-west-2" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

class dbHelper{};
// AWS function to get the player score from cloud7_leaderboard
//
<<<<<<< HEAD
// function getRankings() {
//     dynamoDB.scan({ TableName: "cloud7_leaderboard" }, (err, data) => {
//         if (err) console.error("Error scanning table:", err);
//         else {
//             console.log("All items:", data.Items);
//             return data.Items;      
//         }
//     });
// }
// Update getRankings function to return a Promise
function getRankings() {
    return new Promise((resolve, reject) => {
      dynamoDB.scan({ TableName: "cloud7_leaderboard" }, (err, data) => {
        if (err) {
          console.error("Error scanning table:", err);
          reject(err);
        } else {
          console.log("All items:", data.Items);
          resolve(data.Items);
        }
      });
    });
  }

=======
async function getRankings() {
    
    const result = await dynamoDB.scan({ TableName: "cloud7_leaderboard" }).promise();
    return result.Items;
}
>>>>>>> main

// AWS function to get the player information from cloud7_player
//
async function getPlayerInfo(id) {
    const params = {
        TableName: "cloud7_player",
        KeyConditionExpression: "playerId = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items;
}

// AWS function to get the player score from cloud7_score
//
async function getPlayerScore(id) {
    const params = {
        TableName: "cloud7_score",
        KeyConditionExpression: "playerId = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items;
}

module.exports = {
    dbHelper,
    getRankings,
    getPlayerInfo,
    getPlayerScore
};