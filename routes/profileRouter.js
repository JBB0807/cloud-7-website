"use strict";

const express = require("express");
const projectsRouter = express.Router();

const ScoreModel = require("../models/scoreModel");

projectsRouter.get("/", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  const playerInfo = await ScoreModel.getPlayerInfo(req.session.user.playerId);
  const rank = await ScoreModel.getPlayerRank(playerInfo[0]?.playerId, playerInfo[0]?.score);

  res.render("profile", {
    pageName: "Profile",
    playerId: req.session.user.playerId,
    rank: rank || "none",
    score: playerInfo[0]?.score || 0,
  });
});

projectsRouter.post("/login", async (req, res) => {
  res.send(html);
});

module.exports = projectsRouter;
