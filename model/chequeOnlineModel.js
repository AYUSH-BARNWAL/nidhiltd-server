const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const chequeOnline = new mongoose.Schema({
  transactiontype: {
    type: String,
    default: "deposit",
  },
  accounttype: {
    type: String,
    default: "saving",
  },
  accountnumber: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
  transactiondate: {
    type: String,
    default: new Date(),
  },
  paymode: {
    type: String,
  },
  balance: {
    type: Number,
  },
  selectedaccountno: {
    type: Number,
  },
  bankname: {
    type: String,
  },
  particular: {
    type: String,
  },
  shareamount: {
    type: Number,
    default: 0,
  },
  membershipamount: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
  },
  companyaccount: {
    type: Number,
  },
  membershipnumber: {
    type: Number,
    default: 0,
  },
});

chequeOnline.plugin(AutoIncrement, { inc_field: "chequeOrOnlineId" });
const chequeOrOnline = mongoose.model("chequeOrOnline", chequeOnline);
module.exports = chequeOrOnline;
