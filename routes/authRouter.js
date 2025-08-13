const express = require("express");
const router = express.Router();
const congnito = require("../services/cognito");

// Sign up
router.post("/signUp", async (req, res) => {
  const { playerId, email, password } = req.body;
  try {
    await congnito.signUp(playerId, email, password);
    res.render("verify", { pageName: "Verify Account", playerId: playerId });
  } catch (err) {
    res.status(400).send(`❌ Registration failed: ${err.message}`);
  }
});

// Login
router.get("/login", (req, res) => {
  res.render("login", { pageName: "Login" });
});

router.post("/login", async (req, res) => {
  const { playerId, password } = req.body;
  try {
    const result = await congnito.login(playerId, password);
    req.session.user = {
      playerId,
      idToken: result.AuthenticationResult.IdToken,
    };
    res.redirect("/profile");
  } catch (err) {
    res.status(401).send(`❌ Login failed: ${err.message}`);
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.post("/verify", async (req, res) => {
  const result = await congnito.confirmSignUp(req.body.playerId, req.body.code);
  if (result) {
    res.render("verify", { pageName: "Account Verified", verified: true });
  }
});

module.exports = router;
