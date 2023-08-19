const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const Routes = require("./router/router.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./db/db.js");
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",") || "";
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
    origin: (origin, cb) => {
      ALLOWED_ORIGINS.includes(origin) ? cb(null, true) : cb(null, false);
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
