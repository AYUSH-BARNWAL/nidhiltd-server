const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const Routes = require("./router/router.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./db/db.js");

const app = express();
app.use(express.json());
// var corsOptions = {
//   origin: "http://localhost:3000",
// };

app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header({ "Access-Control-Allow-Origin": "*" });
//   next();
// });
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("origin", origin);
      if (!origin) return callback(null, true);
      if (/.*localhost.*|.*vercel.*|.*netlify.*/g.test(origin)) {
        return callback(null, true);
      }
    },
    credentials: true,
  })
);

const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

database.connect(username, password);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.use("/", Routes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
