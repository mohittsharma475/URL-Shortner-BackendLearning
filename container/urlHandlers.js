const { urlModel } = require("../models/urlModel");
const nanoId = require("shortid");

async function handleCreateUrlShortID(req, res) {
  try {
    const body = req.body;
    console.log(req.body);
    if (!body.url) {
      return res.status(400).json({ err: "Url reqquired" });
    }
    const shortId = nanoId(8);
    await urlModel.create({
      shortId: shortId,
      redirectUrl: req.body.url,
      visitHistory: [],
    });
    return res.json({ shortId });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server error" });
  }
}

async function handleAnalysis(req, res) {
  const shortId = req.params.shortId;
  const result = await urlModel.findOne({shortId:shortId});
  return res
    .json({
        totalclicks: result.visitHistory.length ,
        visitHistory: result.visitHistory 
});
}

async function handleGetUrlByShortId(req, res) {
  const shortId = req.params.shortId;
  const entry = await urlModel.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  return res.status(200).redirect(entry.redirectUrl);
}

module.exports = {
  handleAnalysis,
  handleCreateUrlShortID,
  handleGetUrlByShortId,
};


