"use strict";

const express = require("express");
const session = require("express-session");
const path = require("path");
const leaderboardRouter = require("./routes/leaderboardRouter");
const profileRouter = require("./routes/profileRouter");
const authRouter = require("./routes/authRouter");
const headerData = require("./middleware/headerData");

const isProduction = process.env.NODE_ENV == "production";

console.log("Environment:", isProduction ? "Production" : "Development");

const app = express();

app.set('trust proxy', 1);

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      //keep production security settings below disable for the mean-time because we need to integrate redis session for cross-origin to work properly
      sameSite: "lax", // or 'none' if using cross-origin
      secure: isProduction, // only true in production over HTTPS
      httpOnly: isProduction, // true if you want to prevent client-side JavaScript from accessing the cookie
      domain: isProduction ? "hextrixweb.jbbalahadia.ca" : undefined, // set to your domain if needed
    },
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
