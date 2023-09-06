const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const membermodel = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  membershipCharge: {
    type: Number,
  },
  balance: {
    type: Number,
    default: 0, // Set a default value for the balance field
  },
  membershipnumber: {
    type: Number,
  },
});

membermodel.plugin(AutoIncrement, { inc_field: "membershipnumber" });
const membership = mongoose.model("membership", membermodel);
module.exports = membership;
