const express = require("express");
const dotenv = require("dotenv");
const Routes = require("./router/router.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./db/db.js");

const app = express();
app.use(bodyParser.json({ extended: true }));
// var corsOptions = {
//   origin: "http://localhost:3000",
// };

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});
app.use(cors());

dotenv.config();

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
