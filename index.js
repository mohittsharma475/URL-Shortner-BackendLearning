const express = require("express");
const { connectToDb } = require("./connectToDb");
const { createRequestLog } = require("./middleware/createRequestLog");
const { router } = require("./routes/urlRouter");

connectToDb("mongodb://127.0.0.1:27017/URL")
  .then(() => {
    console.log("Connection successful");
    startServer();
  })
  .catch((err) => {
    console.log("connection unsuccessful");
  });

function startServer() {
  const app = express();
  const port = 8000;

  // middleware to log requests
  app.use(createRequestLog("log.txt"));
  // middleware to parse bodies
  app.use(express.json());

  //routes
  app.get("/test", (req, res) => {
    return res.send("<h1>Hey you are in Test Environment</h1>");
  });
  app.use("/url", router);

  app.listen(port, () => {
    console.log(`server started at port: ${port}`);
  });
}
