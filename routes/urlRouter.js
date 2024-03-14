const express = require("express");

const {
  handleAnalysis,
  handleGetUrlByShortId,
  handleCreateUrlShortID,
} = require("../container/urlHandlers");

const router = express.Router();

router.route("/").post(handleCreateUrlShortID);

router.route("/:shortId").get(handleGetUrlByShortId);

router.route("/anlaysis/:shortId").get(handleAnalysis);

module.exports = { router };
