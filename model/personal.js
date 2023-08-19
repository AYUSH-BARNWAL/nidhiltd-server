const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const personalModel = new mongoose.Schema({
  membership: Number,
  title: String,
  firstName: String,
  middleName: String,
  lastName: String,
  birth: String,
  father: String,
  mother: String,
  gender: String,
  martial: String,
  spouse: String,
  email: String,
  phone: String,
  aadhar: String,
  pan: String,
  voter: String,
  ration: String,
  area: String,
  landmark: String,
  post: String,
  dist: String,
  state: String,
  pin: String,

  name1: String,
  aadhar1: String,
  email1: String,
  pan1: String,
  phone1: String,
  relation1: String,
  voter1: String,
  ration1: String,

  name2: String,
  aadhar2: String,
  email2: String,
  pan2: String,
  phone2: String,
  relation2: String,
  voter2: String,
  ration2: String,

  name3: String,
  aadhar3: String,
  email3: String,
  pan3: String,
  phone3: String,
  relation3: String,
  voter3: String,
  ration3: String,
});

personalModel.plugin(AutoIncrement, { inc_field: "personalId" });
const personal = mongoose.model("personal", personalModel);
module.exports = personal;
