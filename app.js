"use strict";

const express = require("express");
const session = require("express-session");
const path = require("path");
const leaderboardRouter = require("./routes/leaderboardRouter");
const profileRouter = require("./routes/profileRouter");
const authRouter = require("./routes/authRouter");
const headerData = require("./middleware/headerData");

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Attach header data to all requests
app.use(headerData);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const logger = require("morgan");
app.use(logger("dev"));

// Use environment variable if defined, or a fixed value if not.&nbsp;
const PORT = process.env.PORT || 3003;

//use routes of other pages
app.use("/leaderboard", leaderboardRouter);
app.use("/profile", profileRouter);
app.use("/auth", authRouter);

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
