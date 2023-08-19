const Cheque = require("../model/chequeOnlineModel.js");

// Add Cheque Online Transaction
exports.addChequeOnline = async (req, res) => {
  try {
    const lastRecord = await Cheque.findOne().sort({ _id: -1 });

    let transactionType = req.body.transactiontype;
    let newBalance = 0;

    if (lastRecord) {
      if (transactionType === "withdraw") {
        newBalance = Number(lastRecord.balance) - Number(req.body.amount);
      } else if (transactionType === "deposit") {
        newBalance = Number(lastRecord.balance) + Number(req.body.amount);
      } else {
        newBalance =
          Number(lastRecord.balance) +
          Number(req.body.shareamount) +
          Number(req.body.membershipamount);
      }
    } else {
      // Handle the case when there are no records yet
      // For example, set newBalance based on req.body.amount
      newBalance = Number(req.body.amount);
    }

    console.log(newBalance);
    req.body.balance = newBalance;
    const cheque = req.body;
    const newcheque = new Cheque(cheque);

    await newcheque.save();
    res.status(201).json(newcheque);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get Cheque Transactions
exports.getcheque = async (req, res) => {
  try {
    const cheque = await Cheque.find({});
    res.status(200).json(cheque);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
