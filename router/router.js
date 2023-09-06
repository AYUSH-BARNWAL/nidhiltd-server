const express = require("express");
const { addpersonal } = require("../controller/personalcontroller.js");
const { addcash, getcash } = require("../controller/cashController.js");
const {
  addChequeOnline,
  getcheque,
} = require("../controller/checkController.js");
const {
  membership,
  getmembershipno,
} = require("../controller/membershipcontroller.js");
const { addpromotor } = require("../controller/promotorController.js");
const { account, getaccount } = require("../controller/accountController.js");
const { signin, signup } = require("../controller/userController.js");

const authenticate = require("../middlewares/authmiddleware.js"); // Import your authentication middleware

const router = express.Router();

router.post(`/cash`, authenticate, addcash); // Protected route, requires authentication
router.post(`/online`, authenticate, addChequeOnline); // Protected route, requires authentication
router.get(`/allCash`, authenticate, getcash); // Protected route, requires authentication
router.get(`/allChequeOnline`, authenticate, getcheque); // Protected route, requires authentication
router.post(`/personal`, authenticate, addpersonal); // Protected route, requires authentication
router.post(`/membership`, authenticate, membership); // Protected route, requires authentication
router.get(`/getmembershipnumber`, authenticate, getmembershipno); // Protected route, requires authentication
router.post(`/addpromotors`, authenticate, addpromotor); // Protected route, requires authentication
router.post(`/account`, authenticate, account); // Protected route, requires authentication
router.get(`/getaccount`, authenticate, getaccount); // Protected route, requires authentication
router.post(`/signin`, signin);
router.post(`/signup`, signup);

module.exports = router;
