const ScoreModel = require("../models/scoreModel");

exports.getLeaderBoard = async (req, res) => {
  const rankings = await ScoreModel.getRankings();
  res.render("leaderboard", {
    pageName: "Leaderboard",
    rankings: rankings,
  });
};
