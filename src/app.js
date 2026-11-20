const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({
    firstName: "Arup",
    lastName: "Dey",
  });
});

app.post("/user", (req, res) => {
  res.send("Data saved successfully");
});

// known as request handler
// use will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777...");
});
