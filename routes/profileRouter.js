"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const projectsRouter = express.Router();

const ScoreModel = require("../models/scoreModel");


projectsRouter.get("/", async (req, res) => {
  res.render("login", { pageName: "HexTrix Profile"});
});

projectsRouter.post("/login", async (req, res) => {
  res.send(html);
});

module.exports = projectsRouter;
