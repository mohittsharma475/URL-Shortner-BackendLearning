const express = require("express");
const { connectToDb } = require("./connectToDb");
const { createRequestLog } = require("./middleware/createRequestLog");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
const { router } = require("./routes/urlRouter");
const { urlModel } = require("./models/urlModel");
=======
=======
>>>>>>> Stashed changes
const urlRouter  = require("./routes/urlRouter");
// const { urlModel } = require("./models/urlModel");
const path = require("path");
const staticRouter = require("./routes/staticRoute");
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
<<<<<<< Updated upstream

  //routes
  app.get("/test", async (req, res) => {
    const allURLs = await urlModel.find({});
    console.log(allURLs);
    return res.send(`
    <html>
      <head></head>
      <body>
        <ol>
          ${allURLs
            .map((url) => {
              return `<li>${url.shortId}-${url.redirectUrl}-${url.visitHistory.length}</li>`;
            })
            .join("")}
        </ol>
      </body>
    </html>`);
  });
  app.use("/url", router);
=======
=======
>>>>>>> Stashed changes
  app.use(express.urlencoded({extended:false}));
 
  app.use("/", staticRouter);
  
  app.use("/url", urlRouter);



  // //routes
  // app.get("/test", async (req, res) => {
  //   const allURLs = await urlModel.find({});
  //   return res.render("home",{urls:allURLs});
  // });

 
  
>>>>>>> Stashed changes

  app.listen(port, () => {
    console.log(`server started at port: ${port}`);
  });
}
