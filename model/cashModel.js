const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const cashModel = new mongoose.Schema({
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
    default: null,
  },
  amount: {
    type: Number,
    default: 0,
  },
  transactiondate: {
    type: Date,
    default: new Date(),
  },
  paymode: {
    type: String,
    default: "cash",
  },
  particular: {
    type: String,
    default: "",
  },
  balance: {
    type: Number,
    default: 0,
  },
  shareamount: {
    type: Number,
    default: 0,
  },
  membershipamount: {
    type: Number,
    default: 0,
  },
  membershipnumber: {
    type: Number,
  },
  // member: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "membermodel", // Reference the membermodel
  // },
});

cashModel.plugin(AutoIncrement, { inc_field: "cashId" });
const cash = mongoose.model("cash", cashModel);
module.exports = cash;
