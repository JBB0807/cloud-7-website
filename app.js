"use strict";

const express = require("express");
const fs = require("fs");
const path = require("path");
const leaderboardRouter = require("./routes/leaderboardRouter");
const profileRouter = require("./routes/profileRouter");
const combineHTML = require("./middleware/combineHTML");

const app = express();

const logger = require("morgan");
app.use(logger("dev"));

// Use environment variable if defined, or a fixed value if not.&nbsp;
const PORT = process.env.PORT || 3000;

//use middleware to combine header and footer
app.use(combineHTML);

//use routes of other pages
app.use("/leaderboard", leaderboardRouter);
app.use("/profile", profileRouter);

//for static files
app.use(express.static("public"));

// route for the site root
app.get("/", (req, res) => {
  const body = fs.readFileSync(
    path.join(__dirname, "pages", "index.html"),
    "utf8"
  );

  getPlayerScore("1");

  res.send(res.locals.header + body + res.locals.footer);
});

// start listening
app.listen(PORT, () => {
  console.log(`Hello Express listening on port ${PORT}!`);
});
