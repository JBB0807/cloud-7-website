"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const contactRouter = express.Router();
const leaderboardRouter = express.Router();
const dbHelper = require("../utils/dbHelper");

leaderboardRouter.get("/", async (req, res) => {
  const leader = await dbHelper.getTopPlayer();

  const rankings = await dbHelper.getRankings();
  console.log("Rankings:", rankings);
  res.render("leaderboard", { pageName: "Leaderboard", leader: leader, rankings: rankings });
});

module.exports = leaderboardRouter;
