const fs = require("fs");

function createRequestLog(fileName) {
  return (req, res, next) => {
    const log = `\n${Date.now()},${req.ip},${req.method},${req.path}`;
    fs.appendFile(fileName, log, (err, data) => {
      next();
    });
  };
}

module.exports = { createRequestLog };
