"use strict";

const express = require("express");
const path = require("path");
const leaderboardRouter = require("./routes/leaderboardRouter");
const profileRouter = require("./routes/profileRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const logger = require("morgan");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true })); // Parses form data

// Use environment variable if defined, or a fixed value if not.&nbsp;
const PORT = process.env.PORT || 3003;

//use routes of other pages
app.use("/leaderboard", leaderboardRouter);
app.use("/profile", profileRouter);

//for static files
app.use(express.static("public"));

// route for the site root
app.get("/", async (req, res) => {
  res.render("index", { pageName: "HexTris" });
});

// start listening
app.listen(PORT, () => {
  console.log(`Hello Express listening on http://localhost:${PORT}`);
});
