"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const contactRouter = express.Router();

contactRouter.get("/", (req, res) => {
  const body = fs.readFileSync(
    path.join(__dirname, "..", "pages", "leaderboard.html"),
    "utf8"
  );
  res.send(res.locals.header + body + res.locals.footer);
});


module.exports = contactRouter;
