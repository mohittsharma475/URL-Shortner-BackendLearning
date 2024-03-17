const express = require("express");
const { connectToDb } = require("./connectToDb");
const { createRequestLog } = require("./middleware/createRequestLog");

const urlRouter = require("./routes/urlRouter");
// const { urlModel } = require("./models/urlModel");
const path = require("path");
const staticRouter = require("./routes/staticRoute");
const userRoute =  require("./routes/userRoute");
const cookieParser =  require("cookie-parser")

const {restrictTologgedInUserOnly,checkAuth} =  require("./middleware/authencation")

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

  app.use(createRequestLog("log.txt"));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  
  app.use("/url",restrictTologgedInUserOnly,urlRouter);
  app.use("/user",userRoute);
  app.use("/",checkAuth, staticRouter);

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
