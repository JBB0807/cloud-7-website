//
// AWS Functions
//
const AWS = require("aws-sdk");
const e = require("express");
AWS.config.update({ region: "us-west-2" });
require("dotenv").config();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = {
  // AWS function to get the top player cloud7_score
  async getTopPlayer() {
    const params = {
      TableName: "cloud7_score",
      IndexName: "LeaderboardIndex",
      Limit: 1,
      ScanIndexForward: true, // Sort in descending order
    };

    const result = await dynamoDB.scan(params).promise();
    return result.Items[0];
  },

  // AWS function to get the player rankings from cloud7_score
  async getRankings() {
    const params = {
      TableName: "cloud7_score",
      KeyConditionExpression: "gsiPartitionKey = :pk",
      ExpressionAttributeValues: {
        ":pk": "leaderboard",
      },
      IndexName: "LeaderboardIndex",
      ScanIndexForward: true, // Sort in descending order
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items;
  },

  // AWS function to get the player rank based on playerId and its score
  async getPlayerRank(playerId, score) {
    if (!playerId || !score) {
      return null; // Return null if playerId or score is not provided
    }

    const params = {
      TableName: "cloud7_score",
      KeyConditionExpression: "gsiPartitionKey = :pk AND scoreNegative <= :negScore",
      ExpressionAttributeValues: {
        ":pk": "leaderboard",
        ":negScore": -score,
      },
      IndexName: "LeaderboardIndex",
      ScanIndexForward: true, // Sort in descending order
    };

    const result = await dynamoDB.query(params).promise();

    //get the rank of the player
    const playerRank = result.Items.findIndex(item => item.playerId === playerId.trim().toLowerCase()) + 1;
    return playerRank > 0 ? playerRank : null;
  },

  // AWS function to get the player information
  async getPlayerInfo(id) {
    const params = {
      TableName: "cloud7_score",
      KeyConditionExpression: "playerId = :id",
      ExpressionAttributeValues: {
      ":id": id.trim().toLowerCase(),
      },
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items;
  },
};
