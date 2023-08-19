const Promotor = require("../model/promotormodel.js");

// Add Promotor Record
exports.addpromotor = async (req, res) => {
  const pro = req.body;
  const newpro = new Promotor(pro);
  try {
    await newpro.save();
    res.status(201).json(newpro);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
