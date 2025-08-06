"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const contactRouter = express.Router();
const leaderboardRouter = express.Router();
const dbHelper = require("../utils/dbHelper");

leaderboardRouter.get("/", async (req, res) => {
  res.render("leaderboard", { pageName: "Leaderboard" });
});

module.exports = leaderboardRouter;
