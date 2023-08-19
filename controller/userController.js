const user = require("../model/user"); // Use user for importing the model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "nidhil";

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    }); // Await the create method

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      JWT_SECRET
    );
    res.status(200).json({
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    existingUser.token = token;
    existingUser.password = password;
    res.status(200).json({
      success: true,
      token,
      user,
      message: `User Login Success`,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Password is incorrect`,
    });
  }
};

module.exports = {
  signup,
  signin,
};
