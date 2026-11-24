const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instance of the user model
    const user = new User({ ...req.body, password: passwordHash });

    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    res.status(400).send("Error saving the user: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // if (!validator.isEmail(emailId)) {
    //   throw new Error("Email is not correct");
    // }
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const accessToken = await user.getJWT();

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      });
      res.send("Login successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error login: " + error.message);
  }
});

module.exports = authRouter;
