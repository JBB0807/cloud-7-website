//
// AWS Functions
//
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

class dbHelper{};
// AWS function to get the player score from cloud7_leaderboard
//
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


// AWS function to get the player information from cloud7_player
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

// AWS function to get the player score from cloud7_score
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

module.exports = {
    dbHelper,
    getRankings,
    getPlayerInfo,
    getPlayerScore
};