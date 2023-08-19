const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async (username, password) => {
  const URL = process.env.MONGODB_URL;
  await mongoose
    .connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      console.log("DB Connection Failed");
      console.error(error);
      process.exit(1);
    });
};
