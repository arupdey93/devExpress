const express = require("express");

const { adminAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res, next) => {
  res.send("Get all data from the first middleware");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("Delete user from the second middleware");
});

app.get("/user", (req, res, next) => {
  console.log("Received 1");
  res.send("User route");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777...");
});
