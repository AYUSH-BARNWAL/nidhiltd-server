const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const finnancialModel = new mongoose.Schema({
  name1: String,
  name2: String,
  name3: String,
  relation1: String,
  relation2: String,
  relation3: String,
  email1: String,
  phone1: String,
  aadhar1: String,
  pan1: String,
  voter1: String,
  ration1: String,

  email2: String,
  phone2: String,
  aadhar2: String,
  pan2: String,
  voter2: String,
  ration2: String,

  email3: String,
  phone3: String,
  aadhar3: String,
  pan3: String,
  voter3: String,
  ration3: String,
  shareamount: String,
  numberofshare: String,
  membershipcharge: String,
  promotors: String,
});

finnancialModel.plugin(AutoIncrement, { inc_field: "sharePurchaseId" });
const finnancial = mongoose.model("sharePurchase", finnancialModel);
module.exports = finnancial;
