const express = require("express");
const connectDB = require("./config/database");

const app = express();

app.use(express.json());

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req?.body;

  if (!firstName || !lastName || !emailId || !password) {
    return res.status(400).send("All fields are required!");
  }

  // creating a new instance of the user model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password,
  });

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    res.status(400).send("Error saving the user:", error.message);
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
    res.status(400).send("Error fetching the user:", error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Error fetching the users:", error.message);
  }
});

app.delete("/delete-user", async (req, res) => {
  const { userId } = req?.body;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully!");
  } catch (error) {
    res.status(400).send("Error deleting the user:", error.message);
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
