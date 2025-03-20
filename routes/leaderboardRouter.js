"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const contactRouter = express.Router();
const leaderboardRouter = express.Router();
const dbHelper  = require("../utils/dbHelper");


// contactRouter.get("/", (req, res) => {
//   const body = fs.readFileSync(
//     path.join(__dirname, "..", "pages", "leaderboard.html"),
//     "utf8"
//   );
//   res.send(res.locals.header + body + res.locals.footer);
// });


// module.exports = contactRouter;

leaderboardRouter.get("/", async (req, res) => {
  const body = fs.readFileSync(
    path.join(__dirname, "..", "pages", "leaderboard.html"),
    "utf8"
  );

  let html = res.locals.header + body + res.locals.footer;
  html = html.replaceAll("{pageName}", "Leaderboard");

  html = await dbHelper.updateHeader(html);

  res.send(html);
});

leaderboardRouter.get("/data", async (req, res) => {
  try {
    const rankings = await dbHelper.getRankings();
    res.json(rankings);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard data" });
  }
});

module.exports = leaderboardRouter;