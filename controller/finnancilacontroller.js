const Finnancial = require("../model/finnalcial.js");

// Add Financial Record
exports.addfinnancial = async (req, res) => {
  const fin = req.body;
  const newfin = new Finnancial(fin);
  try {
    await newfin.save();
    res.status(201).json(newfin);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
