const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
require("node:process").loadEnvFile();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // if (!validator.isEmail(emailId)) {
    //   throw new Error("Email is not correct");
    // }
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Incorrect creds");
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
      throw new Error("Incorrect creds");
    }
  } catch (error) {
    res.status(400).send("Error login: " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send("Connection request sent successfully by " + user.firstName);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.get("/user", async (req, res) => {
  const { emailId } = req?.body;

  try {
    const users = await User.find({ emailId });
    if (!users || users.length === 0) {
      return res.status(404).send("User not found!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Error fetching the user: " + error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Error fetching the users: " + error.message);
  }
});

app.patch("/updateUser", async (req, res) => {
  const data = req?.body;
  try {
    const user = await User.findByIdAndUpdate(data?.userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully!");
  } catch (error) {
    res.status(400).send("Error updating the user: " + error.message);
  }
});

app.delete("/deleteUser", async (req, res) => {
  const { userId } = req?.body;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully!");
  } catch (error) {
    res.status(400).send("Error deleting the user: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected...", err);
  });
