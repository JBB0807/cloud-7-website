"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const contactRouter = express.Router();
const leaderboardRouter = express.Router();
const leaderBoardController = require("../controllers/LeaderboardController");

leaderboardRouter.get("/", leaderBoardController.getLeaderBoard);

module.exports = leaderboardRouter;
