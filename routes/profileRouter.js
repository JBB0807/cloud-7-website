"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const projectsRouter = express.Router();

projectsRouter.get("/", (req, res) => {
  const body = fs.readFileSync(
    path.join(__dirname, "..", "pages", "profile.html"),
    "utf8"
  );

  res.send(res.locals.header + body + res.locals.footer);
});

module.exports = projectsRouter;
