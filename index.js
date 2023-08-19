const express = require("express");
const dotenv = require("dotenv");
const Routes = require("./router/router.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./db/db.js");

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/", Routes);
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

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
