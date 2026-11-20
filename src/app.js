const express = require("express");
const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // creating a new instance of the user model
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "virat@yahoo.in",
    password: "virat@123",
  });

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    res.status(400).send("Error saving the user:", error.message);
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
