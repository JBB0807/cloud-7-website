const ScoreModel = require("../models/scoreModel");

module.exports = async function headerDataMiddleware(req, res, next) {
  try {
    const leader = await ScoreModel.getTopPlayer();

    // Attach to locals so all views can access it
    res.locals.headerData = leader;
    next();
  } catch (err) {
    console.error("Header data middleware failed:", err);
    next(err); // Let Express handle it
  }
};
