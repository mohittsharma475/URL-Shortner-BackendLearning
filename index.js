const express = require("express");
const { connectToDb } = require("./connectToDb");
const { createRequestLog } = require("./middleware/createRequestLog");

const urlRouter = require("./routes/urlRouter");
// const { urlModel } = require("./models/urlModel");
const path = require("path");
const staticRouter = require("./routes/staticRoute");

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

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  // middleware to log requests
  app.use(createRequestLog("log.txt"));
  // middleware to parse bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/", staticRouter);

  app.use("/url", urlRouter);

  app.listen(port, () => {
    console.log(`server started at port: ${port}`);
  });
}

// //routes
// app.get("/test", async (req, res) => {
//   const allURLs = await urlModel.find({});
//   console.log(allURLs);
//   return res.send(`
//   <html>
//     <head></head>
//     <body>
//       <ol>
//         ${allURLs
//           .map((url) => {
//             return `<li>${url.shortId}-${url.redirectUrl}-${url.visitHistory.length}</li>`;
//           })
//           .join("")}
//       </ol>
//     </body>
//   </html>`);
// });

// //routes
// app.get("/test", async (req, res) => {
//   const allURLs = await urlModel.find({});
//   return res.render("home",{urls:allURLs});
// });
