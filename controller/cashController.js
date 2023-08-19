const Cash = require("../model/cashModel.js");
const Member = require("../model/membermodel.js"); // Import membermodel

exports.addcash = async (req, res) => {
  try {
    const [lastRecord] = await Cash.find({}).sort({ _id: -1 }).limit(1);
    let balance = 0; // Default balance if there are no records yet
    if (lastRecord) {
      balance = Number(lastRecord.balance);
    }

    let transactionType = req.body.transactiontype;
    let newBalance;
    let amount = Number(req.body.amount);

    if (transactionType === "withdraw") {
      newBalance = balance - amount;
    } else if (transactionType === "deposit") {
      newBalance = amount + balance;
    } else {
      if (Number(req.body.shareamount) === 0) {
        newBalance = balance + Number(req.body.amount);
      } else {
        newBalance =
          balance +
          Number(req.body.shareamount) +
          Number(req.body.membershipamount);
      }
    }

    req.body.balance = newBalance;

    // Check if membership number exists in membermodel
    const membershipNumberExists = await Member.exists({
      membershipnumber: req.body.membershipnumber,
    });

    if (!membershipNumberExists) {
      return res.status(404).json({ message: "Invalid membership number" });
    }

    const cash = req.body;
    const newcash = new Cash(cash);

    await newcash.save();
    res.status(201).json(newcash);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

exports.getcash = async (req, res) => {
  try {
    const cash = await Cash.find({});
    res.status(200).json(cash);
  } catch (error) {
    res.status(404).json({ message: error.res.data });
  }
};
