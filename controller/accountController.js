const Account = require("../model/newAccModel");

exports.account = async (req, res) => {
  const accountdetails = req.body;
  console.log(accountdetails);
  const newaccountdetails = new Account(accountdetails);
  try {
    await newaccountdetails.save();
    res.status(200).json(newaccountdetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getaccount = async (req, res) => {
  try {
    const getaccountdetails = await Account.find();
    res.status(200).json(getaccountdetails);
  } catch (error) {
    console.error("Error while calling getaccount API:", error);
    throw error;
  }
};
