const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const accountSchema = mongoose.Schema({
  accountopenningdate: {
    type: String,
  },
  bankname: {
    type: String,
  },
  companyaccount: {
    type: Number,
  },
  IFSC: {
    type: String,
  },
  accountactive: {
    type: String,
  },
  useforprinter: {
    type: String,
  },
});

accountSchema.plugin(AutoIncrement, { inc_field: "companyaccount" });
const account = mongoose.model("bankAccount", accountSchema);

module.exports = account;
