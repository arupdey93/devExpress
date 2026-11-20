const express = require("express");

const app = express();

app.get(
  "/user",
  (req, res, next) => {
    console.log("Received 1");
    // res.send("Received 1");
    next();
  },
  (req, res, next) => {
    console.log("Received 2");
    // res.send("Received 2");
    next();
  },
  [
    (req, res, next) => {
      console.log("Received 3");
      // res.send("Received 3");
      next();
    },
    (req, res, next) => {
      console.log("Received 4");
      // res.send("Received 4");
      next();
    },
  ],
  (req, res, next) => {
    console.log("Received 5");
    // res.send("Received 5");
    next();
  },
  (req, res, next) => {
    console.log("Received 6");
    res.send("Received 6");
  },
);

app.listen(7777, () => {
  console.log("Server is listening on port 7777...");
});
