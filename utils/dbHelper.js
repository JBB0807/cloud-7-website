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
async function getRankings() {
    
    const result = await dynamoDB.scan({ TableName: "cloud7_leaderboard" }).promise();
    return result.Items;
}

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