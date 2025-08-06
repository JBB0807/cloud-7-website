"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const projectsRouter = express.Router();

const dbHelper = require("../utils/dbHelper");

projectsRouter.get("/", async (req, res) => {
  res.render("login", { pageName: "HexTrix Profile" });
});

projectsRouter.post("/login", async (req, res) => {
  const body = fs.readFileSync(
    path.join(__dirname, "..", "pages", "profile.html"),
    "utf8"
  );

  const userId = req.body.userid;
  let html = res.locals.header + body + res.locals.footer;
  html = html.replaceAll("{pageName}", "Profile");

  let playerRankInfo = await dbHelper.getPlayerRankInfo(userId);
  console.log("Player Rank Info:", playerRankInfo);
  if (playerRankInfo) {
    html = html.replaceAll("{playerName}", playerRankInfo[0].name);
    html = html.replaceAll("{rank}", playerRankInfo[0].rank);
    html = html.replaceAll("{score}", playerRankInfo[0].score);
  }

  html = await dbHelper.updateHeader(html);

  res.send(html);
});

module.exports = projectsRouter;
