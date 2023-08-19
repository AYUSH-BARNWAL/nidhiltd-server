const Member = require("../model/membermodel.js");

// Add Membership Record
exports.membership = async (req, res) => {
  const member = req.body;
  try {
    const lastMember = await Member.findOne().sort({ membershipnumber: -1 });
    const balance = lastMember ? lastMember.balance : 0;
    member.balance = balance + Number(req.body.membershipamount);

    const newMember = new Member(member);
    await newMember.save();

    res.status(201).json(newMember);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get Membership Number
exports.getmembershipno = async (req, res) => {
  try {
    const lastMember = await Member.findOne().sort({ membershipnumber: -1 });
    if (lastMember) {
      res.status(200).json({ membershipnumber: lastMember.membershipnumber });
    } else {
      res.status(404).json({ message: "No membership records found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
