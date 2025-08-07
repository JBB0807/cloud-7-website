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

  // AWS function to get the player rankings from cloud7_scor
  async getRankings() {
    const result = await dynamoDB.scan({ TableName: "cloud7_score" }).promise();
    return result.Items;
  },

  async getPlayerRankInfo(id) {
    const params = {
      TableName: "cloud7_score",
      KeyConditionExpression: "playerId = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items;
  },

  // AWS function to get the player information
  async getPlayerInfo(id) {
    const params = {
      TableName: "cloud7_score",
      KeyConditionExpression: "playerId = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items;
  },
};
