const express = require("express");

const app = express();

app.get("/getUserData", (req, res, next) => {
  try {
    throw new Error("Something went wrong");
    res.send("User data");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777...");
});
